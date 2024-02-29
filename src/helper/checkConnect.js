'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 5000;

const countConnect = () => {
    const numConnections = mongoose.connections.length
    console.log(`Number of connections: ${numConnections}`)
}

const checkOverLoading = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss
        const maxConnection = numCores * 5

        console.log(`Active connections: ${numConnections}`)
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024}MB`)

        if (numConnections > maxConnection) {
            console.log('Connection limit exceeded')
        }

    }, _SECONDS)
}

module.exports = {
    countConnect,
    checkOverLoading
}