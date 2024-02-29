const Repository = require("./repository");

module.exports = {
    apiKeyRepository: new Repository(require("./apikey.model")),
};
