const packageJson = require("./package.json");

const { Command } = require("commander");
const program = new Command();

program
  .name("snapbase")
  .description(packageJson.description)
  .version(packageJson.version);

require("./commands/configure")(program);
require("./commands/backup")(program);

program.parse(process.argv);
