import { spawn } from "child_process";
import { dockerImageTag, setCallback } from "../lib";

const runDockerImage = async (name: string) => {
  const dockerRun = spawn(
    'docker',
      ['run',
      '-p', '3000:3000',
      // '-d',
      '--name', name,
      dockerImageTag(name)
    ]
  );

  setCallback(dockerRun, (code: number) => {
    console.log('Done with code: ', code);
  });
};

const _start = async (name: string) => {
  await runDockerImage(name);
};

export const start = async (name: string) => {
  await _start(name);
};
