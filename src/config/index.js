const AppConfig = {
    NODE_ENV: process.env.NODE_ENV || "DEV",
    APP_PORT: process.env.APP_PORT || "5000",

    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/Zoroo",
    REDIS_URL: process.env.REDIS_URL || "redis://127.0.0.1:6379/1",

    WRITE_LOG_FILE:
        Boolean(process.env.WRITE_LOG_FILE) || this.NODE_ENV == "PROD",
};

module.exports = AppConfig;
