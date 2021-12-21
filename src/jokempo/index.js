const ArgumentError = require('./errors')
const actions = require('./controllers')
const messages = require('./messages/announces')

module.exports = {

    index(message, args) {
        
        try {
            const [action, ...secondArgs] = args
            if (!action) {
                message.channel.send({
                    embed: messages.tutorial(),
                })
                .then(msg => {
                    msg.react('👍')
                })
                return
            }
            if (!actions.actionList.includes(action))
                throw new ArgumentError(`Função "${action}" desconhecida`)
            const validationFunction = actions[`${action}Validate`]
            const validatedArgs = validationFunction && validationFunction(message, secondArgs)
            actions[action](message, validatedArgs)
        } catch (err) {
            if (err instanceof ArgumentError)
                message.channel.send({embed: messages.announceError(err.message)})
            else
                console.log('Houve um erro: ' + err)
        }
    },
    
}