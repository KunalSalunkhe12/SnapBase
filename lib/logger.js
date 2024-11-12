import fs from "fs";
import path from "path";

const logFile = path.join(process.cwd(), "backup-log.txt");

export function logActivity({
  command,
  startTime,
  endTime,
  status,
  timeTaken,
  stderr,
  error,
}) {
  const logEntry = `
Command: ${command}  
Start Time: ${startTime}
End Time: ${endTime}
Status: ${status}
Time Taken: ${timeTaken} ms
${stderr ? `Info:\n${stderr}` : ""}
${error ? `Error: ${error.message}` : ""}
`;

  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error("Failed to write log:", err);
  });
}
