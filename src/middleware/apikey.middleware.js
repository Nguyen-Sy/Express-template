const { ForbiddenError } = require("../core/error.response");
const ApiKeyService = require("../services/apikey.service");
const { logger } = require("../plugin");
const API_KEY = "x-api-key";

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[API_KEY]?.toString();
        if (!key) {
            throw ForbiddenError();
        }

        const objKey = await ApiKeyService.findApikeyByKey(key);
        if (!objKey) {
            throw ForbiddenError();
        }
        req.apiKey = objKey;
        return next();
    } catch (err) {
        logger.error(`Middleware::apiKey: ${err.message}`);
    }
};

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.apiKey.permissions) {
            throw ForbiddenError("Permission denied");
        }

        const validPermission = req.apiKey.permissions.includes(permission);
        if (!validPermission) {
            throw ForbiddenError("Permission denied");
        }

        return next();
    };
};

module.exports = {
    apiKey,
    permission,
};