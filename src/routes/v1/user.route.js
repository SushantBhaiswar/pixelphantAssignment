const express = require('express');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations/v1');
const { userController } = require('../../controllers/v1/');
const auth = require('../../middlewares/auth');


const router = express.Router();
router.post('/create', validate(userValidation.createUser), userController.createUser);
router.post('/fetch', auth(), validate(userValidation.fetchUser), userController.getUser);

module.exports = router;
