import dotenv from 'dotenv';
import { Repository } from '../lib';
import chalk from 'chalk';

dotenv.config();
const log = console.log;

export const search = async (queryTxt: string) => {
  const dApps = await Repository.search(queryTxt);

  const name = chalk.bold.red;
  const desc = chalk.hex('#FFA500');

  log(`\nFound following ${dApps.length} dApps:`);
  for (const dApp of dApps) {
    log(`${name(dApp.name)} :- ${desc(dApp.description)}`);
  }

  log(`\nTo add a dApp type "meroku add <name>"`);
};
