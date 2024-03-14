require("dotenv").config()
require("../db/init.mongodb")
const { apiKeyModel } = require("./index")
const { ApiKeyService } = require("../services/index")
const { logger } = require("../plugin")

const seedApiKey = async () => {
	await apiKeyModel.collection.drop()
	await ApiKeyService.createApikey()
}

const seed = async () => {
	await seedApiKey()
	return null
}

seed().then(() => {
	logger.debug("Seeding success")
	process.exit(0)
})
