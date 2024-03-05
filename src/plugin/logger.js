const { WRITE_LOG_FILE } = require("../config");
const { createLogger, format, transports } = require("winston");
const { File, Console } = transports;
const util = require("util");

const logger = createLogger({
    level: "debug",
});

const formatCustom = format.printf(({ level, message, label, timestamp }) => {
    return `${level} ${timestamp}: ${
        typeof message === "string"
            ? message
            : util.inspect(message, { colors: true })
    }`;
});

if (WRITE_LOG_FILE) {
    const fileFormat = format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json()
    );
    const errTransport = new File({
        filename: "./logs/error.log",
        format: fileFormat,
        level: "error",
    });
    const infoTransport = new File({
        filename: "./logs/combined.log",
        format: fileFormat,
    });
    logger.add(errTransport);
    logger.add(infoTransport);
} else {
    const errorStackFormat = format((info) => {
        if (info.stack) {
            console.log(info.stack);
            return false;
        }
        return info;
    });
    const consoleTransport = new Console({
        format: format.combine(
            format.colorize(),
            format.simple(),
            format.timestamp({ format: "DD/MM/YYYY HH:mm:ss" }),
            errorStackFormat(),
            formatCustom
        ),
    });
    logger.add(consoleTransport);
}

module.exports = logger;
