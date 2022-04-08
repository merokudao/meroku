const stopDockerImage = async (name: string) => {

};

const _stop = async (name: string) => {
  await stopDockerImage(name);
};

export const stop = async (name: string) => {
  await _stop(name);
};
