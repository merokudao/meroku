import { Repository } from '../lib';

export const stop = async (name: string) => {
  await new Repository(name).stop();
};
