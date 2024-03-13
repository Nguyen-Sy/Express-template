"use strict";
const mongoose = require("mongoose");
const { DB_URL } = require("../config");
const { BadRequestError } = require("../core/error.response");
const { logger } = require("../plugin");

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        if (DB_URL) {
            if (1 === 1) {
                mongoose.set("debug", true);
                mongoose.set("debug", { color: true });
            }
            mongoose
                .connect(DB_URL)
                .then((_) => {
                    logger.info("Connection to mongodb created");
                })
                .catch((err) => {
                    throw new BadRequestError(err);
                });
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongoDb = Database.getInstance();
module.exports = instanceMongoDb;
