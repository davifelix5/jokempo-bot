const ArgumentError = require('../../errors')
const registrationServices = require('../services/register')
const validators = require('../validators/register')
const authMessages = require('../messages')
const messages = require('../../messages')

module.exports = {

    async registerValidate(message, args) {
        const user = message.author
        const nickname = args.join(' ')
        const guildId = message.channel.guild.id
        try {
            await validators.userExists(message, guildId)
            if (!nickname)
                throw new ArgumentError(`Informe um nickname`)
            await validators.nicknameExists(nickname, guildId)
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
        const guildId = message.channel.guild.id
        if (!options) return
        const [user, nickname] = options
        registrationServices.registerUser(user, nickname, guildId)
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
        const guildId = message.channel.guild.id
        if (cancel) {
            registrationServices.cancelUnregistration(message.author, guildId)
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
        registrationServices.deleteUser(author, guildId)
            .then(deleted => {
                if (deleted)
                    message.channel.send({
                        embed: messages.announceSuccess('Usuário apagado com sucesso!')
                    })
                else
                    message.channel.send({
                        embed: authMessages.aksUnregisterConfirmation()
                    })
            })
            .catch(err => {
                message.channel.send({
                    embed: messages.announceError('Erro ao apagar usuário')
                })
            })
    },

}