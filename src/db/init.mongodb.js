"use strict";
const mongoose = require("mongoose");

const { DB_HOST, DB_PORT, DB_NAME } = require("../config");
const { countConnect } = require("../helper/checkConnect");

const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

class Database {
    constructor() {
        this.connect();
    }

    connect(type = "mongodb") {
        if (1 === 1) {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }
        mongoose
            .connect(connectionString)
            .then((_) => {
                console.log("Connected to Mongo");
                countConnect();
            })
            .catch((err) => console.log(err));
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
