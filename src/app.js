require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const app = express();
const config = require("./config");

//init middleware
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
// Show routes called in console during development
if (config.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}

// database connection
require("./db/init.mongodb");
require("./db/init.redis");

// init route
app.use("/", require("./routers"));

module.exports = app;
