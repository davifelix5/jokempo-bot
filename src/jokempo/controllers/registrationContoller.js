const ArgumentError = require('../errors')
const registrationServices = require('../services/register')
const validators = require('../validators/register')
const messages = require('../messages/announces')

module.exports = {

    async registerValidate(message, args) {
        const user = message.author
        const nickname = args.join(' ')
        try {
            await validators.userExists(message)
            if (!nickname)
                throw new ArgumentError(`Informe um nickname`)
            await validators.nicknameExists(nickname)
        } catch (err) {
            if (err instanceof ArgumentError)
                message.channel.send({
                    embed: messages.announceWarning(err.message)
                })
            else
                console.log('Erro ao cadastrar usuário: ' + err)
            return null
        }
        return [user, nickname]
    },

    async register(message, args) {
        const options = await args
        if (!options) return
        const [user, nickname] = options
        registrationServices.registerUser(user, nickname, message.channel.guild.id)
            .then(res => {
                message.channel.send({
                    embed: messages.announceSuccess(`Usuário ${user} cadastrado como **${nickname}**`)
                })
            })
            .catch(err => {
                message.channel.send({
                    embed: messages.announceError(`Erro no cadastro do usuário ${user}. Tente novamente!`)
                })
            })
    },

    unregisterValidate(message, args) {
        const [arg] = args

        if (!arg) return
        
        else if (arg == 'cancel')
            return true
        
        else
            throw new ArgumentError(`Argumentos inválidos!`)
    },

    unregister(message, cancel) {
        const { author } = message
        if (cancel) {
            registrationServices.cancelUnregistration(message.author)
                .then(res => {
                    message.channel.send({
                        embed: messages.announceSuccess('Operação cancelada com sucesso')
                    })
                })
                .catch(err => {
                    message.channel.send({
                        embed: messages.announceWarning('Você não tem uma operação para cancelar')
                    })
                })
            return
        }
        registrationServices.deleteUser(author)
            .then(deleted => {
                if (deleted)
                    message.channel.send({
                        embed: messages.announceSuccess('Usuário apagado com sucesso!')
                    })
                else
                    message.channel.send({
                        embed: messages.aksUnregisterConfirmation()
                    })
            })
            .catch(err => {
                message.channel.send({
                    embed: messages.announceError('Erro ao apagar usuário')
                })
            })
    },

}