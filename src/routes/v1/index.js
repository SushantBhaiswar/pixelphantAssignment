const express = require('express');

const router = express.Router();

const userRoutes = require('./user.route');
const taskRoutes = require('./task.route');
const authRoutes = require('./auth.route');


// API Gateway routing
const serviceRoutes = {
    '/auth': authRoutes,
    '/user': userRoutes,
    '/tasks': taskRoutes,
};

// Proxy requests to appropriate services
Object.keys(serviceRoutes).forEach((route) => {
    router.use(route, serviceRoutes[route]);
});
module.exports = router;
