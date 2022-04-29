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
  .command('search <query>')
  .description('Search for a dApp with the name containing the query')
  .action(search);

program.parse();
