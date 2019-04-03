const winston = require("winston");
var fs = require("fs");
var path = require("path");

const { createLogger, format, transports } = winston;
const logDir = "logs";
const logToConsole = false;

if (!fs.existsSync(logDir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDir);
}

const transportCommon = {
  maxsize: 5242880,
  maxFiles: 5,
  colorize: true,
  json: true, 
};

const requestTransport = new winston.transports.File({
  level: 'info',
  filename: path.join(logDir, "/requests.json"),
  ...transportCommon,
});

const debugTransport = new winston.transports.File({
  level: 'debug',
  filename: path.join(logDir, "/debug.json"),
  ...transportCommon,
});

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [requestTransport, debugTransport]
});

if (logToConsole) {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  );
}

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};
