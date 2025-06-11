# Snapbase - Database Backup CLI 

https://roadmap.sh/projects/database-backup-utility

A command-line interface (CLI) utility for backing up MySQL and MongoDB databases with support for compression and local storage.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Configure](#configure)
  - [Backup](#backup)
  - [Restore](#restore)
- [Logging](#logging)
- [Error Handling](#error-handling)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)

## Features

✨ Key features of the Database Backup CLI:

- Support for MySQL and MongoDB databases
- Interactive configuration setup
- Full database backups with compression
- Local storage for backup files
- Detailed activity logging
- Database restore capabilities
- Cross-platform compatibility

## Prerequisites

Before installing the CLI, ensure you have:

- Node.js 16.x or higher
- npm 8.x or higher
- [MySQL Binaries](https://www.mysql.com/products/community/) (if using MySQL backups)
- [MongoDB Binaries](https://www.mongodb.com/try/download/database-tools) (if using MongoDB backups)

## Installation

### Global Installation

Install the CLI globally via npm:

```bash
npm install -g snapbase
```

This allows you to run the snapbase command directly from the terminal.

```bash
snapbase configure --out ./backup-config.json
```

### Local Installation

Or install locally in your project:

```bash
npm install snapbase
```

⚠️ After a local installation, you have to use npx to run the CLI:

```bash
npx snapbase configure --out ./backup-config.json
```

## Configuration

Use the interactive configuration command to set up your database connection:

```bash
snapbase configure --out ./backup-config.json
```

This will create a configuration file with the following structure:

For MySQL:

```json
{
  "type": "mysql",
  "host": "localhost",
  "port": "3306",
  "user": "your_username",
  "password": "your_password",
  "databaseName": "your_database",
  "backupDir": "./backup"
}
```

For MongoDB:

```json
{
  "type": "mongodb",
  "uri": "mongodb://localhost:27017",
  "databaseName": "your_database",
  "backupDir": "./backup"
}
```

⚠️ Important: Add your configuration file to .gitignore to keep your credentials secure.

## Usage

### Configure

Set up your database connection settings:

```bash
snapbase configure [options]
```

Options:

- `--out <path>`: Path to save configuration file (default: ./backup-config.json)

### Backup

Create a database backup:

```bash
snapbase backup [options]
```

Options:

- `--config <path>`: Path to configuration file (default: ./backup-config.json)

### Restore

Restore a database from backup:

```bash
snapbase restore [options]
```

Options:

- `--config <path>`: Path to configuration file (default: ./backup-config.json)

## Logging

The CLI automatically logs all backup and restore activities to `backup.log` in the application directory. Each log entry includes:

- Command executed
- Start time
- End time
- Status
- Time taken
- Any errors encountered

## Error Handling

The CLI includes comprehensive error handling for:

- Database connection failures
- Invalid configuration
- Backup/restore operation failures

All errors are:

- Displayed in the console with helpful messages
- Logged to the activity log file
- Include relevant error codes and suggestions

## Limitations

Current limitations of the CLI:

- Supports MySQL and MongoDB databases only
- Full backups only (no incremental or differential backups)
- Local storage only (no cloud storage options)
- No notification system
- No partial backup/restore functionality

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

📦 [NPM Package](https://www.npmjs.com/package/snapbase) |
🐛 [Report Bug](https://github.com/KunalSalunkhe12/SnapBase/issues) |
✨ [Request Feature](https://github.com/KunalSalunkhe12/SnapBase/issues)
