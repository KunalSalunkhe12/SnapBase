import path from "path";
import { promises as fs } from "fs"; // Importing `promises` from `fs` module
import chalk from "chalk";

export default async function getConfig(configPath) {
  try {
    const data = await fs.readFile(path.resolve(configPath));
    return JSON.parse(data);
  } catch (error) {
    console.log(
      chalk.red(
        "Could not read config file. Make sure the file exists and the path is correct."
      )
    );
    console.log(
      chalk.yellow("Run `snapbase configure` to create a new config file.")
    );
    process.exit(1);
  }
}
