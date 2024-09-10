import getConfig from "../lib/getConfig.js";
import { createMongoDBBackup } from "../lib/mongodb/mongodb-backup.js";

export default (program) => {
  program
    .command("backup")
    .description("Backup database")
    .option(
      "--config <path>",
      "Path to configuration file",
      "./backup-config.json"
    )
    .action(async (options) => {
      const { config } = options;
      const configData = await getConfig(config);

      switch (configData.type) {
        case "mongodb":
          await createMongoDBBackup(configData, options);
          break;

        default:
          break;
      }
    });
};
