import fs from "fs";
import chalk from "chalk";
import { input, select, password } from "@inquirer/prompts";

export default (program) => {
  program
    .command("configure")
    .description("Configure database connection settings")
    .option(
      "--out <path>",
      "Path to save configuration file",
      "./backup-config.json"
    )
    .action(async (options) => {
      try {
        const { out: configPath } = options;

        const dbType = await select({
          message: "Select database type",
          choices: [
            { name: "MySQL", value: "mysql" },
            { name: "MongoDB", value: "mongodb" },
          ],
        });

        let config = {};

        // Prompt user for database connection settings based on the selected database type
        switch (dbType) {
          case "mysql":
            config = {
              host: await input({
                message: "Enter host name:",
                default: "localhost",
                required: true,
              }),
              port: await input({
                message: "Enter port:",
                default: dbType === "mysql" ? "3306" : "5432",
                required: true,
              }),
              user: await input({ message: "Enter username:" }),
              password: await password({
                message: "Enter password:",
                required: true,
              }),
              databaseName: await input({
                message: "Enter database name:",
                required: true,
              }),
              backupDir: await input({
                message: "Enter the path to save backup files:",
                default: "./backup",
                required: true,
              }),
            };
            break;

          case "mongodb":
            config = {
              uri: await input({
                message: "Enter MongoDB connection URI:",
                default: "mongodb://localhost:27017",
                required: true,
              }),
              databaseName: await input({
                message: "Enter database name:",
                required: true,
              }),
              backupDir: await input({
                message: "Enter the path to save backup files:",
                default: "./backup",
                required: true,
              }),
            };
            break;

          default:
            console.log(chalk.red("Unsupported database type."));
            return;
        }

        // Save configuration to a file
        fs.writeFileSync(
          configPath,
          JSON.stringify({ type: dbType, ...config }, null, 2)
        );
        console.log(
          chalk.green(
            `Configuration saved to ${configPath}, Make sure to add the file to .gitignore :)`
          )
        );
      } catch (e) {
        console.log(chalk.red("Something went wrong. Please try again."));
        console.log(
          chalk.yellow(
            "Check if the path is correct. Eg: ./backup-config.json, Don't forget to add the file name and extension"
          )
        );
      }
    });
};
