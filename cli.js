#!/usr/bin/env node

import { Command } from "commander";

import configureCommands from "./commands/configure.js";
import backupCommands from "./commands/backup.js";
import restoreCommands from "./commands/restore.js";

const program = new Command();

program
  .name("snapbase")
  .description("A CLI tool to backup and restore any type of databases")
  .version("1.0.0");

// Commands
configureCommands(program);
backupCommands(program);
restoreCommands(program);

program.parse(process.argv);
