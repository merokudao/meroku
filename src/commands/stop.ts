import { spawn } from "child_process";
import { dockerImageTag, setCallback } from "../lib";

const stopDockerImage = (name: string) => {
  const dockerRun = spawn(
    'docker', ['container', 'stop', name]
  );

  setCallback(dockerRun, (code: number) => {
    console.log('Docker container stopped. Exit Code: ', code);
    removeDockerImage(name);
  });
};

const removeDockerImage = (name: string) => {
  const dockerRun = spawn(
    'docker', ['container', 'rm', name]
  );

  setCallback(dockerRun, (code: number) => {
    console.log('Docker image removed. Exit code: ', code);
  });
};

const _stop = (name: string) => {
  stopDockerImage(name);
};

export const stop = (name: string) => {
  _stop(name);
};
