const getConfig = require("../utils/getConfig.js");
const createMYSQLBackup = require("../utils/mysql-backup.js");
const createMongoDBBackup = require("../utils/mongodb-backup.js");

module.exports = (program) => {
  program
    .command("backup")
    .description("Backup database")
    .allowUnknownOption(true)
    .action(async (_, options) => {
      const config = await getConfig();

      switch (config.type) {
        case "mysql":
          await createMYSQLBackup(config);
          break;
        case "mongodb":
          await createMongoDBBackup(config, options);
          break;

        default:
          break;
      }
    });
};
