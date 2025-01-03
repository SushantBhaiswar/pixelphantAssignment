const rabbitmqManager = require('./manager')

const store = [
    {
        exchangeName: 'task-exc',
        queueName: 'task-que'
    }
]

const initializeExcQue = () => {
    store?.forEach((info) => {
        rabbitmqManager.setup(info.exchangeName, info.queueName)
    })
}
module.exports = initializeExcQue