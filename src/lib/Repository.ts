import { spawn } from 'child_process';
import * as fs from 'fs-extra';
import path from 'path';
import {
  engine,
  remoteHasNpmOrYarn,
  remoteHasYarn,
  setCallback
} from './utils';

/**
 * Repository Class
 */
export class Repository {
  public url?: string;
  public readonly name: string;

  constructor(name: string, url?: string) {
    this.name = name;
    this.url = url;
  }

  public async add(this: Repository) {
    const dockerFileContent = await this.generateDockerfileContents();
    const dockerFilePath = await this.saveDockerfile(dockerFileContent);
    await this.buildDockerImage(dockerFilePath);
  }

  private async isLocalRepoSaved(this: Repository): Promise<boolean> {
    return true;
  }

  private async getRepoUrl(this: Repository): Promise<string> {
    return '';
  }

  private async generateDockerfileContents(this: Repository): Promise<string> {
    console.log('Generating docker file...');
    if (this.url && (await remoteHasNpmOrYarn(this.url))) {
      return await engine.renderFile('Dockerfile', {
        repoUrl: this.url,
        name: this.name,
        hasYarn: await remoteHasYarn(this.url)
      });
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
    console.log('Saved docker file at ', filePath);
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
      console.log('Done with code: ', code);
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
      console.log('Done with code: ', code);
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
