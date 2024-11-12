import getConfig from "../lib/getConfig.js";
import { MongoDBBackup } from "../lib/backups/mongodbBackup.js";
import { MySQLBackup } from "../lib/backups/mySqlBackup.js";
import { logActivity } from "../lib/logger.js";

function getBackupClass(config) {
  switch (config.type) {
    case "mongodb":
      return new MongoDBBackup(config);
    case "mysql":
      return new MySQLBackup(config);
    default:
      throw new Error("Unsupported database type");
  }
}

export default (program) => {
  program
    .command("restore")
    .description("Restore database from backup")
    .option(
      "--config <path>",
      "Path to configuration file",
      "./backup-config.json"
    )
    .action(async (options) => {
      const config = await getConfig(options.config);
      const backupInstance = getBackupClass(config);

      const startTime = Date.now();
      let status = "success";
      let error = null;

      try {
        await backupInstance.restoreBackup(options); // Assuming the restore method can take options if needed
      } catch (err) {
        status = "failed";
        error = err;
      }

      const endTime = Date.now();
      logActivity({
        command: "restore",
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status,
        timeTaken: endTime - startTime,
        error,
      });
    });
};
