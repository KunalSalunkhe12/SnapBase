import { MongoClient } from "mongodb";
import chalk from "chalk";
import {
  DATABASE_CONNECTION_ERROR,
  DATABASE_CONNECTION_SUCCESS,
} from "../constants/index.js";

// MongoDB Connection Test
export async function testMongoDBConnection(config, spinner) {
  const { uri } = config;
  try {
    const client = new MongoClient(uri);
    await client.connect();
    await client.close();
    spinner.succeed(chalk.green(DATABASE_CONNECTION_SUCCESS));
    return true;
  } catch (err) {
    spinner.fail(chalk.red(DATABASE_CONNECTION_ERROR), err.message);
    return false;
  }
}
