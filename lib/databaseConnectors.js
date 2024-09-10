import mysql from "mysql2/promise";
import pkg from "pg"; // Import the default export from 'pg'
const { Client: PgClient } = pkg;
import sqlite3 from "sqlite3";
import { MongoClient } from "mongodb";
import chalk from "chalk";
import ora from "ora"; // Import ora for spinners

// MySQL Connection Test
export async function testMySQLConnection(config) {
  const { host, port, user, password, databaseName } = config;
  const spinner = ora("Testing MySQL connection...").start();
  try {
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database: databaseName,
    });
    await connection.end();
    spinner.succeed(chalk.green("MySQL connection successful."));
    return true;
  } catch (err) {
    spinner.fail(chalk.red("MySQL connection failed:"), err.message);
    return false;
  }
}

// PostgreSQL Connection Test
export async function testPostgreSQLConnection(config) {
  const { host, port, user, password, databaseName } = config;
  const spinner = ora("Testing PostgreSQL connection...").start();
  try {
    const client = new PgClient({
      host,
      port,
      user,
      password,
      database: databaseName,
    });
    await client.connect();
    await client.end();
    spinner.succeed(chalk.green("PostgreSQL connection successful."));
    return true;
  } catch (err) {
    spinner.fail(chalk.red("PostgreSQL connection failed:"), err.message);
    return false;
  }
}

// SQLite Connection Test
export async function testSQLiteConnection(config) {
  const { filepath } = config;
  const spinner = ora("Testing SQLite connection...").start();
  return new Promise((resolve) => {
    const db = new sqlite3.Database(filepath, (err) => {
      if (err) {
        spinner.fail(chalk.red("SQLite connection failed:"), err.message);
        resolve(false);
      } else {
        db.close((err) => {
          if (err) {
            spinner.fail(
              chalk.red("SQLite connection failed during close:"),
              err.message
            );
            resolve(false);
          } else {
            spinner.succeed(chalk.green("SQLite connection successful."));
            resolve(true);
          }
        });
      }
    });
  });
}

// MongoDB Connection Test
export async function testMongoDBConnection(config) {
  const { uri } = config;
  const spinner = ora("Testing MongoDB connection...").start();
  try {
    const client = new MongoClient(uri);
    await client.connect();
    await client.close();
    spinner.succeed(chalk.green("MongoDB connection successful."));
    return true;
  } catch (err) {
    spinner.fail(chalk.red("MongoDB connection failed:"), err.message);
    return false;
  }
}
