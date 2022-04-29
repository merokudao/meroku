import { program } from 'commander';
import { add, start, stop, search } from './commands';

program
  .command('add <repoUrl> <name>')
  .description('Add a new dApp to your BitPack Self Hosting')
  .action(add);

program
  .command('start <name>')
  .description('Start an app named <name>')
  .action(start);

program
  .command('stop <name>')
  .description('Stop an app named <name>')
  .action(stop);

program
  .command('search')
  .argument('<query>', 'Type a few characters to search for a dApp')
  .option('-t, --tag [tag...]', 'Filter dApps by these tags only')
  .option('-c, --chainId [chainId...]', 'Filter dApps by these chainIds only')
  .option('-d, --description', 'Search in description', false)
  .description(
    'Search for dApps. Searches by default in dApp name across all chains'
  )
  .action(search);

program.parse();
