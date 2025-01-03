const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config/config')
const rabbitmqManager = require('../../rabbitmq/manager');

(() => {
    rabbitmqManager.consume(`${config.env}-task-que`, async ({ content, fields, properties }) => {

        console.log("🚀 ~ rabbitmqManager.consume ~ content, fields, properties :", content, fields, properties)
        await rabbitmqManager.publish(`${config.env}-task-exc`, 'create', 'response', {
            correlationId: properties.correlationId,
            replyTo: properties.replyTo
        })
    })

})();

router.get('/', async (req, res, next) => {
    try {
        const resp = await rabbitmqManager.rpcClient(`${config.env}-task-exc`, 'create', { msg: 'heeey' }).then()
        console.log("🚀 ~ router.get ~ resp:", resp)
        //const response = await axios.post(`${serviceUrl}/api/timesheets`, req.body);
        res.json('hello');
    } catch (error) {
        next(error);
    }
});
module.exports = router;

