const path = require("path");
const fs = require("fs");
const { input, select, password } = require("@inquirer/prompts");

module.exports = (program) => {
  program
    .command("configure")
    .description("Configure database connection settings")
    .action(async () => {
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
          config.host = await input({
            message: "Enter host (default: localhost):",
            default: "localhost",
          });
          config.port = await input({
            message: `Enter port (default: ${
              dbType === "mysql" ? 3306 : 5432
            }):`,
            default: dbType === "mysql" ? "3306" : "5432",
          });
          config.user = await input({ message: "Enter username:" });
          config.password = await password({ message: "Enter password:" });
          config.database = await input({ message: "Enter database name:" });
          break;

        case "sqlite":
          config.filepath = await input({
            message:
              "Enter file path for SQLite database (default: ./database.sqlite):",
            default: "./database.sqlite",
          });
          break;

        case "mongodb":
          config.uri = await input({
            message:
              "Enter MongoDB connection URI (default: mongodb://localhost:27017):",
            default: "mongodb://localhost:27017",
          });
          config.database = await input({ message: "Enter database name:" });
          break;

        default:
          console.log("Unsupported database type.");
          return;
      }

      // Save configuration to a file
      const configPath = path.join(__dirname, "../backup-config.json");
      fs.writeFileSync(
        configPath,
        JSON.stringify({ type: dbType, ...config }, null, 2)
      );
      console.log(`Configuration saved to ${configPath}`);
    });
};
