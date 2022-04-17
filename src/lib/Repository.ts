import { spawn } from 'child_process';
import * as fs from 'fs-extra';
import path from 'path';
import { PackageJson } from './PackageJson';
import { Selfhosting } from './Selfhosting';
import {
  engine,
  readUrl,
  remoteHasNpmOrYarn,
  remoteHasSelfhosting,
  remoteHasYarn,
  repoUrlForFile,
  setCallback
} from './utils';
import Debug from 'debug';
import urlExist from 'url-exist';

const debug = Debug('meroku:Repository');

/**
 * Repository Class
 */
export class Repository {
  public url?: string;
  public readonly name: string;

  private readonly envFileOrder = [
    '.env',
    '.envrc',
    '.env.dist',
    '.env.prod',
    '.env.dev',
    '.envrc.example',
    '.env.example'
  ];

  constructor(name: string, url?: string) {
    this.name = name;
    this.url = url;
  }

  public async add(this: Repository) {
    const dockerFileContent = await this.generateDockerfileContents();
    const dockerFilePath = await this.saveDockerfile(dockerFileContent);
    await this.buildDockerImage(dockerFilePath);
  }

  public async isRemoteValid(this: Repository): Promise<boolean> {
    if (
      this.url &&
      (await remoteHasNpmOrYarn(this.url)) &&
      (await remoteHasSelfhosting(this.url))
    ) {
      return true;
    } else {
      return false;
    }
  }

  private async isLocalRepoSaved(this: Repository): Promise<boolean> {
    return true;
  }

  private async getRepoUrl(this: Repository): Promise<string> {
    return '';
  }

  private async guessEnvFile(this: Repository): Promise<string | undefined> {
    if (this.url) {
      for (const fName of this.envFileOrder) {
        const url = repoUrlForFile(this.url as string, fName);
        debug('Checking for env file: ', url);
        if (await urlExist(url)) {
          return fName;
        }
      }
    }
  }

  private async generateDockerfileContents(this: Repository): Promise<string> {
    console.log('Generating docker file...');
    if (this.url && (await this.isRemoteValid())) {
      const _url = new URL(this.url);
      const selfHosting = await Selfhosting.loadFromRemoteRepo(_url);
      const packageJson = await PackageJson.fromUrl(_url);
      if (packageJson) {
        selfHosting.buildCmd = packageJson.getBuildCmd();
        selfHosting.startCmd = packageJson.getStartCmd();
        if (selfHosting.startCmd) {
          if (selfHosting.distEnvFile === undefined) {
            const guessedEnvFile = await this.guessEnvFile();
            selfHosting.distEnvFile = guessedEnvFile;
            if (selfHosting.distEnvFile === undefined) {
              console.warn(
                'No dist env file found. Please specify one using `DIST_ENVFILE` instruction in `Selfhosting`'
              );
            }
          }
          return await engine.renderFile('Dockerfile', {
            repoUrl: this.url,
            name: this.name,
            hasYarn: await remoteHasYarn(this.url),
            seho: selfHosting
          });
        } else {
          throw Error(
            'Unable to find a start command. Try specifying it using `START` instruction in `Selfhosting` file.'
          );
        }
      } else {
        throw Error('Invalid package.json');
      }
    } else {
      throw Error("Repository doesn't have npm or yarn");
    }
  }

  private async saveDockerfile(
    this: Repository,
    dockerFile: string
  ): Promise<string> {
    const filePath = await this.dockerFilePath();
    await fs.writeFile(filePath, dockerFile);
    console.info('Saved docker file at ', filePath);
    return filePath;
  }

  private async dockerFilePath(this: Repository): Promise<string> {
    const dockDir = path.join(process.env.HOSTING_DIR as string, '.docks');
    await fs.mkdirp(dockDir);
    const filePath = path.join(dockDir, 'Dockerfile.' + this.name);
    return filePath;
  }

  private async buildDockerImage(this: Repository, dockerFilePath: string) {
    const dockerBuild = spawn('docker', [
      'build',
      '--no-cache',
      '-f',
      dockerFilePath,
      '.',
      '-t',
      this.dockerImageTag()
    ]);

    setCallback(dockerBuild, (code: number) => {
      console.info('Done with code: ', code);
    });
  }

  private dockerImageTag(this: Repository): string {
    return 'bitpack/' + this.name + ':latest';
  }

  public async start(this: Repository) {
    const dockerRun = spawn('docker', [
      'run',
      '-p',
      '3000:3000',
      '-d',
      '--name',
      this.name,
      this.dockerImageTag()
    ]);

    setCallback(dockerRun, (code: number) => {
      console.info('Done with code: ', code);
    });
  }

  public async stop(this: Repository) {
    const dockerRun = spawn('docker', ['container', 'stop', this.name]);

    setCallback(dockerRun, (code: number) => {
      console.log('Docker container stopped. Exit Code: ', code);
      this.removeDockerImage();
    });
  }

  private removeDockerImage(this: Repository) {
    const dockerRun = spawn('docker', ['container', 'rm', this.name]);

    setCallback(dockerRun, (code: number) => {
      console.log('Docker image removed. Exit code: ', code);
    });
  }
}
