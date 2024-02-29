const { createLogger, format, transports } = require("winston");
const { combine, splat, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    let msg = `${timestamp.slice(11, 19)} [${level}]: \n\t${message} `;
    return msg;
});

const logger = createLogger({
    level: "debug",
    format: combine(format.colorize(), splat(), timestamp(), myFormat),
    transports: [new transports.Console({ level: "info" })],
});

module.exports = logger;
