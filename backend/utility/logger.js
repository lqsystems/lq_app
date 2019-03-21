const winston = require("winston");
var fs = require("fs");
var path = require("path");

const { createLogger, format, transports } = winston;
const logDir = 'logs';
const logToConsole = true;

if (!fs.existsSync(logDir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, "/log.js") })
  ]
});

if (logToConsole) {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  );
}

module.exports = logger;
