import fs from "fs";
import path from "path";

const logFile = path.join(process.cwd(), "backup-log.txt");

export function logActivity({ startTime, endTime, status, timeTaken, error }) {
  const logEntry = `
    Start Time: ${startTime}
    End Time: ${endTime}
    Status: ${status}
    Time Taken: ${timeTaken} ms
    ${error ? `Error: ${error.message}` : ""}
  `;

  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error("Failed to write log:", err);
  });
}
