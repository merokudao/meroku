import fs from 'fs-extra';
import { readUrl, remoteHasSelfhosting } from './utils';

export enum Instructions {
  DIST_ENVFILE = 'DIST_ENVFILE',
  RUN = 'RUN',
  BUILD = 'BUILD',
  START = 'START'
}

export class Selfhosting {
  contents: Buffer | string;

  private instructions: string[];

  distEnvFile: string | undefined;
  runInstructions: string[];
  buildCmd: string | undefined;
  startCmd: string | undefined;

  constructor(contents: Buffer | string) {
    this.contents = contents;
    this.instructions = [];
    this.runInstructions = [];
    this.validateContents();
  }

  public static loadFromUrl = async (url: URL): Promise<Selfhosting> => {
    if (await remoteHasSelfhosting(url.href)) {
      const contents = await readUrl(url);
      return new Selfhosting(contents);
    }
    throw Error('Cannot find Selfhosting file at remote url');
  };

  public static loadFromFile = async (
    filePath: string
  ): Promise<Selfhosting | undefined> => {
    if (await fs.pathExists(filePath)) {
      const fileContents = await fs.readFile(filePath);
      return new Selfhosting(fileContents);
    } else {
      throw Error('File not found at ' + filePath);
    }
  };

  private validateContents(this: Selfhosting): boolean {
    try {
      this.instructions = this.ignoreComments(
        this.contents.toString('utf-8').split('\n')
      );
      this.parse();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  private ignoreComments(contents: string[]): string[] {
    return contents.filter((el) => {
      return el.startsWith('#');
    });
  }

  private parse(this: Selfhosting) {
    this.instructions.forEach((instruction) => {
      const instructionParts = instruction.split(' ');
      const instructionType = instructionParts[0].toUpperCase();
      const instructionValue = instructionParts.slice(1).join(' ');
      switch (instructionType) {
        case Instructions.DIST_ENVFILE:
          this.distEnvFile = instructionValue;
          break;
        case Instructions.RUN:
          this.runInstructions.push(instructionValue);
          break;
        case Instructions.BUILD:
          this.buildCmd = instructionValue;
          break;
        case Instructions.START:
          this.startCmd = instructionValue;
          break;
        default:
          this.runInstructions.push(instructionValue);
          break;
      }
    });

    // Add defaults if user has not specified some of the instructions
    if (!this.distEnvFile) {
      this.distEnvFile = '.env.dist';
    }
    if (!this.buildCmd) {
      this.buildCmd = 'build';
    }
    if (!this.startCmd) {
      this.startCmd = 'start';
    }
  }
}
