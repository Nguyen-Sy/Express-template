"use strict";

const express = require("express");
const { apiKey, permission } = require("../middleware/apikey.middleware");
const responseFormatter = require("../middleware/format.middleware");
const router = express.Router();

router.use(apiKey);
router.use(permission("0000"));
router.use(responseFormatter);
router.get("/", (req, res, next) => {
    res.sendData("ok");
});

router.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
router.use((error, req, res, next) => {
    return res.status(error.status ? error.status : 500).json({
        status: "Error",
        code: statusCode,
        message: error.message || "Internal Server error",
    });
});

module.exports = router;
