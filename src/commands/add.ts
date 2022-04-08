import dotenv from 'dotenv';
import * as fs from 'fs-extra';
import { spawn } from 'child_process';
import { dockerFilePath, dockerImageTag, engine, setCallback } from '../lib';

dotenv.config();

interface Repo {
  url: string;
  name: string;
};

const generateDockerfileContents = async (repo: Repo): Promise<string> => {
  console.log('Generating docker file...');
  return await engine.renderFile("Dockerfile", {
    repoUrl: repo.url,
    name: repo.name
  });
};

const saveDockerfile = async (dockerFile: string, name: string): Promise<string> => {
  const filePath = await dockerFilePath(name);
  await fs.writeFile(filePath, dockerFile);
  console.log('Saved docker file at ', filePath);
  return filePath;
};

const buildDockerImage = (dockerFilePath: string, name: string) => {
  const dockerBuild = spawn(
    'docker',
      ['build',
      '--no-cache',
      '-f', dockerFilePath, '.',
      '-t', dockerImageTag(name)
    ]
  );

  setCallback(dockerBuild, (code: number) => {
    console.log('Done with code: ', code);
  });

};

const _add = async (repo: Repo) => {
  const dockerFileContent = await generateDockerfileContents(repo);
  const dockerFilePath = await saveDockerfile(dockerFileContent, repo.name);
  buildDockerImage(dockerFilePath, repo.name);
};

export const add = async (repoUrl: string, name: string) => {
  await _add({url: repoUrl, name: name});
};
