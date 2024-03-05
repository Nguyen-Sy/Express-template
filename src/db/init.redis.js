"use strict";
const redis = require("redis");
const { REDIS_URL } = require("../config");
const { BadRequestError } = require("../core/error.response");

class Database {
    constructor() {
        Database.connect();
    }

    static async connect() {
        const redisClient = redis.createClient({
            url: REDIS_URL,
        });
        await redisClient
            .connect()
            .then(() => {
                console.log("Redis connected");
            })
            .catch((err) => {
                throw new BadRequestError(err);
            });
        return redisClient;
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceRedis = Database.getInstance();
module.exports = instanceRedis;
