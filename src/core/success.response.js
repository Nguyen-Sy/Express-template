"use strict";

const { StatusCodes, ReasonPhrases } = require("../utils/httpStatusCode");

class SuccessResponse {
    constructor(
        {
            message,
            status = StatusCodes.OK,
            reasonStatusCode = ReasonPhrases.OK,
            data = {},
        },
        options = null
    ) {
        this.message = !message ? reasonStatusCode : message;
        this.status = status;
        this.data = data;
        this.options = options;
    }

    send(res) {
        res.status(this.status).json(this);
    }
}

class OKResponse extends SuccessResponse {
    constructor({ message, data }, options) {
        super({ message, data }, options);
    }
}

class CreatedResponse extends SuccessResponse {
    constructor(
        {
            message,
            status = StatusCodes.CREATED,
            reasonStatusCode = ReasonPhrases.CREATED,
            data,
        },
        options
    ) {
        super({ message, status, reasonStatusCode, data }, options);
    }
}

module.exports = {
    OKResponse,
    CreatedResponse,
    SuccessResponse,
};
