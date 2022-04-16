import dotenv from 'dotenv';
import { ChildProcessWithoutNullStreams } from 'child_process';
import { Liquid } from 'liquidjs';
import path from 'path';
import urlExist from 'url-exist';

dotenv.config();

export const dirName = (name: string) => {
  const hostDir = process.env.HOSTING_DIR as string;
  return path.join(hostDir, name);
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

export const remoteHasYarn = async (
  githubRepoUrl: string
): Promise<boolean> => {
  const yarnLock = githubRepoUrl + '/blob/main/yarn.lock';
  return await urlExist(yarnLock);
};

export const remoteHasNpm = async (githubRepoUrl: string): Promise<boolean> => {
  const packageJson = githubRepoUrl + '/blob/main/package-lock.json';
  return await urlExist(packageJson);
};

export const remoteHasNpmOrYarn = async (
  githubRepoUrl: string
): Promise<boolean> => {
  return (
    (await remoteHasYarn(githubRepoUrl)) || (await remoteHasNpm(githubRepoUrl))
  );
};
