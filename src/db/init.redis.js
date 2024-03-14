"use strict";
const redis = require("redis");
const { REDIS_URL } = require("../config");
const { BadRequestError } = require("../core/error.response");
const { logger } = require("../plugin");

class Database {
	#connectionTimeOut;

	constructor() {
		this.connect();
		this.#connectionTimeOut = null;
	}

	connect() {
		if (REDIS_URL) {
			const redisClient = redis.createClient({
				url: REDIS_URL,
			});
			redisClient.connect();
			this.#handleEventConnection(redisClient);
		}
	}

	#handleEventConnection(redisClient) {
		redisClient.on("connect", () => {
			logger.info("Connection to redis created");
			clearTimeout(this.#connectionTimeOut);
		});
		redisClient.on("end", (event) => {
			logger.info("Connection to redis ended");
			this.#handleErrorConnection(event);
		});
		redisClient.on("reconnecting", () => {
			logger.info("Connection to redis reconnecting");
			clearTimeout(this.#connectionTimeOut);
		});
		redisClient.on("error", (event) => {
			logger.info("Connection to redis error");
			this.#handleErrorConnection(event);
		});
	}

	#handleErrorConnection(error) {
		this.#connectionTimeOut = setTimeout(() => {
			throw new BadRequestError(error, -99);
		}, 10000);
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
