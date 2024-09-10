import chalk from "chalk";
import { exec } from "child_process";
import { testMongoDBConnection } from "../databaseConnectors.js";
import ora from "ora";

export async function createMongoDBBackup(config) {
  const spinner = ora("Creating Backup...").start();
  try {
    await testMongoDBConnection(config);

    let command = `mongodump --uri=${config.uri} --db=${config.databaseName} --out=${config.outputDir}`;

    exec(command, (error, _, stderr) => {
      if (error || !stderr) {
        spinner.fail(
          chalk.red("Error creating backup, Please check the Config values")
        );
        return;
      }
      spinner.succeed(
        chalk.green("Backup created successfully at ", config.outputDir)
      );
    });
  } catch (error) {
    spinner.fail(chalk.red("Error creating backup"));
  }
}
