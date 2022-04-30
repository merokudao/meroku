import dotenv from 'dotenv';
import { AddOpts, Repository } from '../lib';

dotenv.config();

export const add = async (name: string, opts: AddOpts) => {
  if (opts.url) {
    return new Repository(name, opts.url).add();
  } else {
    const repo = await Repository.fromExactName(name);
    if (repo) {
      return repo.add();
    }
  }
};
