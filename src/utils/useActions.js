const ArgumentError = require('../errors')
const messages = require('../messages')

module.exports = {

    useActions(actions, actionsMessages) {
      return {
        index(message, args) {

          try {
            const [action, ...secondArgs] = args

            if (!action) {
                return message.channel.send({
                    embed: actionsMessages.tutorial(),
                })
                .then(msg => {
                    msg.react('👍')
                })
            }

            const actionList = Object.keys(actions).filter(action => !action.includes('Validate'))
            if (!actionList.includes(action))
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
      }
    }
  },
    
}