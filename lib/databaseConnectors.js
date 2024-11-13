import { MongoClient } from "mongodb";
import mysql from "mysql2/promise";
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

// MySQL Connection Test
export async function testMySQLConnection(config, spinner) {
  const { host, user, password, databaseName } = config;
  try {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database: databaseName,
    });
    await connection.end();
    spinner.succeed(chalk.green(DATABASE_CONNECTION_SUCCESS));
    return true;
  } catch (err) {
    spinner.fail(chalk.red(DATABASE_CONNECTION_ERROR), err.message);
    return false;
  }
}
