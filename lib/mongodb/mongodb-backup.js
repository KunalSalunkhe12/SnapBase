import chalk from "chalk";
import { exec } from "child_process";
import { testMongoDBConnection } from "../databaseConnectors.js";
import ora from "ora";
import {
  BACKUP_FAILED,
  BACKUP_SUCCESS,
  CREATING_BACKUP,
} from "../../constants/index.js";

export async function createMongoDBBackup(config) {
  const spinner = ora(CREATING_BACKUP).start();

  try {
    const connection = await testMongoDBConnection(config, spinner);
    if (!connection) {
      return;
    }

    let command = `mongodump --uri=${config.uri} --db=${config.databaseName} --out=${config.outputDir}`;

    exec(command, (error, _, stderr) => {
      if (error || !stderr) {
        spinner.fail(chalk.red(BACKUP_FAILED));
        return;
      }
      spinner.succeed(chalk.green(BACKUP_SUCCESS, config.outputDir));
    });
  } catch (error) {
    spinner.fail(chalk.red(BACKUP_FAILED));
  }
}
