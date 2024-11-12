import { BaseBackup } from "./baseBackup.js";

export class MySQLBackup extends BaseBackup {
  async createBackup() {
    this.startSpinner("Creating MySQL backup...");

    const { user, password, host, databaseName, backupDir } = this.config;

    const command = `mysqldump -u ${user} -p${password} -h ${host} ${databaseName} > ${backupDir}/${databaseName}.sql`;

    const { info } = await this.executeCommand(
      command,
      "MySQL backup completed successfully",
      "MySQL backup failed"
    );

    return { info };
  }

  async restoreBackup() {
    this.startSpinner("Restoring MySQL backup...");

    const { user, password, host, databaseName, backupDir } = this.config;
    const backupFile = `${backupDir}/${databaseName}.sql`;

    const command = `mysql -u ${user} -p${password} -h ${host} ${databaseName} < ${backupFile}`;

    const { info } = await this.executeCommand(
      command,
      "MySQL restore completed successfully",
      "MySQL restore failed"
    );

    return { info };
  }
}
