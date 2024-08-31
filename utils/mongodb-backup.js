const { exec } = require("child_process");

async function createMongoDBBackup(config, options) {
  let command = `mongodump --uri=${config.uri}`;

  if (options && options.args.length > 0) {
    command += ` ${options.args.join(" ")}`;
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      return;
    } else {
      console.log(`Backup created successfully`);
    }
  });
}

module.exports = createMongoDBBackup;
