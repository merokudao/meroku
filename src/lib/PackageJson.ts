import { packageJsonUrl, readUrl, remoteHasPackageJson } from './utils';
import Debug from 'debug';

const debug = Debug('meroku:packageJson');

interface Scripts {
  [key: string]: string;
}

export class PackageJson {
  url: URL;
  jsonContent: any | undefined;

  private readonly buildOrder = [
    'build',
    'build:dist',
    'build:prod',
    'build:dev'
  ];

  private readonly startOrder = [
    'start',
    'start:dist',
    'start:prod',
    'start:dev'
  ];

  constructor(contents: any, url: URL) {
    this.url = url;
    this.jsonContent = contents;
  }

  public static async fromUrl(url: URL): Promise<PackageJson | undefined> {
    if (await remoteHasPackageJson(url.href)) {
      try {
        const _url = new URL(packageJsonUrl(url.href));
        const contents = await readUrl(_url);
        const jsonContent = contents;
        return new PackageJson(jsonContent, _url);
      } catch (err) {
        debug(err);
        throw Error('Invalid package.json');
      }
    }
  }

  public getBuildCmd(this: PackageJson): string | undefined {
    return this.buildOrder.find((cmd) => cmd in this.getScripts());
  }

  public getStartCmd(this: PackageJson): string | undefined {
    return this.startOrder.find((cmd) => cmd in this.getScripts());
  }

  private getScripts(this: PackageJson): Scripts {
    return this.jsonContent.scripts;
  }
}
