import getConfig from "../lib/getConfig.js";
import { restoreMongoDBBackup } from "../lib/mongodb/mongodb-backup.js";

export default (program) => {
  program
    .command("restore")
    .description("Restore database from backup")
    .option(
      "--config <path>",
      "Path to configuration file",
      "./backup-config.json"
    )
    .option("-c, --collection <name>", "Specify the collection name")
    .action(async (options) => {
      const config = await getConfig(options.config);

      switch (config.type) {
        case "mongodb":
          await restoreMongoDBBackup(config);
          break;
        default:
          console.log("Unsupported database type");
      }
    });
};
