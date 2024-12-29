const express = require('express');
const validate = require('../../middlewares/validate');
const { serviceValidation } = require('../../validations/v1');
const { serviceController } = require('../../controllers/v1/');
const auth = require('../../middlewares/auth');


const router = express.Router();
router.post('/create', auth(), validate(serviceValidation.createService), serviceController.createService);

module.exports = router;
