const crypto = require("node:crypto");
const { apiKeyRepository } = require("../models/index");

class ApiKeyService {
    static createApikey = async () => {
        return await apiKeyRepository.create({
            key: crypto.randomBytes(64).toString("hex"),
            permissions: "0000",
        });
    };

    static findApikeyByKey = async (key) => {
        return await apiKeyRepository.findOne({
            filter: { key: key, status: true },
        });
    };
}

module.exports = ApiKeyService;
