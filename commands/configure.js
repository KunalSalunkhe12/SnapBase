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
            { name: "PostgreSQL", value: "postgresql" },
            { name: "SQLite", value: "sqlite" },
            { name: "MongoDB", value: "mongodb" },
          ],
        });

        let config = {};

        // Prompt user for database connection settings based on the selected database type
        switch (dbType) {
          case "mysql":
          case "postgresql":
            config = {
              host: await input({
                message: "Enter host name:",
                default: "localhost",
              }),
              port: await input({
                message: "Enter port:",
                default: dbType === "mysql" ? "3306" : "5432",
              }),
              user: await input({ message: "Enter username:" }),
              password: await password({ message: "Enter password:" }),
              databaseName: await input({ message: "Enter database name:" }),
              outputDir: await input({
                message: "Enter output directory for backup files:",
                default: "./backup",
              }),
            };
            break;

          case "sqlite":
            config = {
              filepath: await input({
                message: "Enter file path for SQLite database:",
                default: "./database.sqlite",
              }),
              databaseName: await input({
                message: "Enter database name:",
              }),
              outputDir: await input({
                message: "Enter output directory for backup files:",
                default: "./backup",
              }),
            };
            break;

          case "mongodb":
            config = {
              uri: await input({
                message: "Enter MongoDB connection URI:",
                default: "mongodb://localhost:27017",
              }),
              databaseName: await input({
                message: "Enter database name:",
              }),
              outputDir: await input({
                message: "Enter output directory for backup files:",
                default: "./backup",
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
        console.log(chalk.green(`Configuration saved to ${configPath}`));
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
