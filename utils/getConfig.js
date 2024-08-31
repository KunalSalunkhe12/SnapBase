const path = require("path");
const fs = require("fs").promises;

async function getConfig() {
  const configPath = path.join(__dirname, "../backup-config.json");
  const data = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(data);

  return config;
}

module.exports = getConfig;
