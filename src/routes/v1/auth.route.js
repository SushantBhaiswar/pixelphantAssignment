const express = require('express');
const validate = require('../../middlewares/validate');
const { authValidation } = require('../../validations/v1');
const { authController } = require('../../controllers/v1');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', auth(), validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);

module.exports = router;
