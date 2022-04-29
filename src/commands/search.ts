import dotenv from 'dotenv';
import { Repository, SearchOpts } from '../lib';
import chalk from 'chalk';

dotenv.config();
const log = console.log;

export const search = async (queryTxt: string, opts: SearchOpts) => {
  // log(opts);
  const dApps = await Repository.search(queryTxt, opts);

  const name = chalk.bold.red;
  const desc = chalk.hex('#FFA500');

  log(`\nFound following ${dApps.length} dApps:`);
  for (const dApp of dApps) {
    log(`${name(dApp.name)} :- ${desc(dApp.description)}`);
  }

  log(`\nTo add a dApp type "meroku add <name>"`);
};
