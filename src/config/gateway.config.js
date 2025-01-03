
const config = require('./config')

module.exports = {
    port: config.port,
    services: {
        auth: config.domain || 'http://localhost:4001',
        tasks: config.domain || 'http://localhost:4002',
    },
    env: process.env.NODE_ENV || 'development',
};

