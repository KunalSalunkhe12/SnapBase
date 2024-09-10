import chalk from "chalk";
import { exec } from "child_process";

export async function createMongoDBBackup(config) {
  try {
    let command = `mongodump --uri=${config.uri} --db=${config.databaseName} --out=${config.outputDir}`;

    console.log(chalk.blue("Creating backup..."));
    console.log(chalk.blue("Executing command: ", command));

    exec(command, (error, _, stderr) => {
      if (error || !stderr) {
        console.log(
          chalk.red("Error creating backup, Please check the Config values")
        );
        return;
      }
      console.log(
        chalk.green("Backup created successfully at ", config.outputDir)
      );
    });
  } catch (error) {
    console.log(chalk.red("Error creating backup"));
  }
}
