const winston = require("winston");
const config = require("../config");

let logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: config.logger.errorFilePath,
      level: "error"
    }),
    new winston.transports.File({ filename: config.logger.combinedFilePath })
  ]
});

if (config.env !== "production") {
  // add consloe logs only if we are not in production
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.colorize()
      )
    })
  );
}

exports.logger = logger;
