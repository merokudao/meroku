import dotenv from 'dotenv';
import { ChildProcessWithoutNullStreams } from 'child_process';
import { Liquid } from 'liquidjs';
import * as fs from 'fs-extra';
import path from 'path';

dotenv.config();

export const dirName = (name: string) => {
  const hostDir = process.env.HOSTING_DIR as string;
  return path.join(hostDir, name);
};

export const dockerFilePath = async (name: string): Promise<string> => {
  const dockDir = path.join(process.env.HOSTING_DIR as string, '.docks');
  await fs.mkdirp(dockDir);
  const filePath = path.join(dockDir, 'Dockerfile.' + name);
  return filePath;
};

export const dockerImageTag = (name: string): string => {
  return 'bitpack/' + name + ':latest';
};

export const setCallback = (
  chp: ChildProcessWithoutNullStreams,
  onClose: CallableFunction
) => {
  chp.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  chp.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  chp.on('close', (code) => {
    onClose(code);
  });
};

export const engine = new Liquid({
  root: path.resolve(__dirname, '../rekocd/'), // root for layouts/includes lookup
  extname: '.liquid' // used for layouts/includes, defaults ""
});
