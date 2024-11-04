import getConfig from "../lib/getConfig.js";
import { MongoDBBackup } from "../lib/backups/mongodbBackup.js";
import { MySQLBackup } from "../lib/backups/mysqlBackup.js";

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

      try {
        const backupInstance = getBackupClass(config);
        await backupInstance.restoreBackup(options); // Assuming the restore method can take options if needed
      } catch (error) {
        console.error(error.message);
      }
    });
};
