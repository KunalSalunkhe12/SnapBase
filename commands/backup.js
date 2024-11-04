import getConfig from "../lib/getConfig.js";
import { MongoDBBackup } from "../lib/backups/mongodbBackup.js";

function getBackupClass(config) {
  switch (config.type) {
    case "mongodb":
      return new MongoDBBackup(config);
    // Add cases for other databases
    default:
      throw new Error("Unsupported database type");
  }
}

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
      const config = await getConfig(options.config);
      const backupInstance = getBackupClass(config);
      await backupInstance.createBackup();
    });
};
