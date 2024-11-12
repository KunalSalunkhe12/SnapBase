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
            console.log("err", error);
            console.log("stderr", stderr);
            this.fail(failureMessage);
            reject(error || new Error(failureMessage));
          } else {
            this.succeed(successMessage);
            resolve(stderr);
          }
        });
      });

      return { info };
    } catch (error) {
      console.error("Command execution failed:", error);
      return { info: null }; // Or handle the error accordingly
    }
  }
}
