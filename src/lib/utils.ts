import dotenv from 'dotenv';
import { ChildProcessWithoutNullStreams } from 'child_process';
import { Liquid } from 'liquidjs';
import path from 'path';
import urlExist from 'url-exist';
import axios from 'axios';

dotenv.config();

export const dirName = (name: string) => {
  const hostDir = process.env.HOSTING_DIR as string;
  return path.join(hostDir, name);
};

export interface GHRepo {
  author: string;
  repoName: string;
}

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

export const remoteHasSelfhosting = async (
  githubRepoUrl: string
): Promise<boolean> => {
  const selfhosting = githubRepoUrl + '/blob/main/Selfhosting';
  return await urlExist(selfhosting);
};

export const remoteHasNpmOrYarn = async (
  githubRepoUrl: string
): Promise<boolean> => {
  return (
    (await remoteHasYarn(githubRepoUrl)) || (await remoteHasNpm(githubRepoUrl))
  );
};

export const repoUrlForFile = (
  githubRepoUrl: string,
  filePath: string
): string => {
  return githubRepoUrl + '/blob/main/' + filePath;
};

export const parseGithubRepoHomePageUrl = (githubRepoUrl: string): GHRepo => {
  const x = githubRepoUrl.replace(/\/$/, '').split('/').splice(3, 4);
  return {
    author: x[0],
    repoName: x[1]
  };
};

export const packageJsonUrl = (githubRepoUrl: string): string => {
  const repo = parseGithubRepoHomePageUrl(githubRepoUrl);
  return (
    'https://raw.githubusercontent.com/' +
    repo.author +
    '/' +
    repo.repoName +
    '/main/package.json'
  );
};

export const remoteHasPackageJson = async (
  githubRepoUrl: string
): Promise<boolean> => {
  return await urlExist(packageJsonUrl(githubRepoUrl));
};

export const selfhostingUrl = (githubRepoUrl: string): string => {
  const repo = parseGithubRepoHomePageUrl(githubRepoUrl);
  return (
    'https://raw.githubusercontent.com/' +
    repo.author +
    '/' +
    repo.repoName +
    '/main/Selfhosting'
  );
};

export const readUrl = async (url: URL): Promise<string> => {
  const response = await axios.get(url.href);
  return response.data;
};
