import ora from "ora";
import chalk from "chalk";
import { exec } from "child_process";

export class BaseBackup {
  constructor(config) {
    this.config = config;
    this.spinner = ora();
  }

  startSpinner(message) {
    this.spinner.start(message);
  }

  succeed(message) {
    this.spinner.succeed(chalk.green(message));
  }

  fail(message) {
    this.spinner.fail(chalk.red(message));
  }

  async executeCommand(command, successMessage, failureMessage) {
    try {
      const info = await new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error || !stderr) {
            this.fail(failureMessage);
            reject(error || new Error(failureMessage));
          } else {
            this.succeed(successMessage);
            resolve(stderr);
          }
        });
      });

      return { info, error: null };
    } catch (error) {
      return { info: null, error };
    }
  }
}
