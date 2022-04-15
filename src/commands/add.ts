import dotenv from 'dotenv';
import { Repository } from '../lib';

dotenv.config();

export const add = async (repoUrl: string, name: string) => {
  return new Repository(name, repoUrl).add();
};
