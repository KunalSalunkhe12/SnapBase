import { BaseBackup } from "./baseBackup.js";
import { testMongoDBConnection } from "../databaseConnectors.js";

export class MongoDBBackup extends BaseBackup {
  async createBackup() {
    this.startSpinner("Creating MongoDB backup...");

    const connection = await testMongoDBConnection(this.config, this.spinner);
    if (!connection) return;

    const command = `mongodump --uri=${this.config.uri} --db=${this.config.databaseName} --out=${this.config.backupDir} --gzip`;
    this.executeCommand(
      command,
      "MongoDB backup successful",
      "MongoDB backup failed"
    );
  }

  async restoreBackup() {
    this.startSpinner("Restoring MongoDB backup...");

    const connection = await testMongoDBConnection(this.config, this.spinner);
    if (!connection) return;

    const command = `mongorestore --uri=${this.config.uri} --db=${this.config.databaseName} ${this.config.backupDir} --gzip`;
    this.executeCommand(
      command,
      "MongoDB backup restored successfully",
      "Failed to restore MongoDB backup"
    );
  }
}
