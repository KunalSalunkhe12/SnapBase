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
    exec(command, (error, _, stderr) => {
      console.log("error:", error);
      console.log("stderr:", stderr);
      if (error || !stderr) {
        this.fail(failureMessage);
      } else {
        this.succeed(successMessage);
      }
    });
  }
}
