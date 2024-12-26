const express = require('express');

const router = express.Router();

const userRoutes = require('./user.route');
const serviceRoutes = require('./service.route');
const authRoutes = require('./auth.route');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
// router.use('/service', serviceRoutes);

module.exports = router;
