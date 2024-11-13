import { BaseBackup } from "./baseBackup.js";
import { testMySQLConnection } from "../databaseConnectors.js";

export class MySQLBackup extends BaseBackup {
  async createBackup() {
    this.startSpinner("Creating MySQL backup...");

    const connection = await testMySQLConnection(this.config, this.spinner);
    if (!connection) return;

    const { user, password, host, databaseName, backupDir } = this.config;
    const command = `mysqldump -u ${user} -p${password} -h ${host} ${databaseName} > ${backupDir}/${databaseName}.sql`;

    const { info, error } = await this.executeCommand(
      command,
      "MySQL backup completed successfully",
      "MySQL backup failed"
    );

    return { info, error };
  }

  async restoreBackup() {
    this.startSpinner("Restoring MySQL backup...");

    const connection = await testMySQLConnection(this.config, this.spinner);
    if (!connection) return;

    const { user, password, host, databaseName, backupDir } = this.config;
    const backupFile = `${backupDir}/${databaseName}.sql`;

    const command = `mysql -u ${user} -p${password} -h ${host} ${databaseName} < ${backupFile}`;

    const { info, error } = await this.executeCommand(
      command,
      "MySQL restore completed successfully",
      "MySQL restore failed"
    );

    return { info, error };
  }
}
