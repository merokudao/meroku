import { Repository } from '../lib';

export const start = async (name: string) => {
  await new Repository(name).start();
};
