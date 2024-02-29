"use strict";

const express = require("express");
const { apiKey, permission } = require("../middleware/apikey.middleware");
const router = express.Router();

// router.use(apiKey);
// router.use(permission("0000"));

router.get('/', (req, res, next) => {
    res.json("Oke")
})
module.exports = router;
