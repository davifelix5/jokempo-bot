const registrationServices = require('../services/register')
const ArgumentError = require('../../errors')

module.exports = {
    
    async isRegistered(user, guildId) {
        const isRegisted = await registrationServices.isUserRegistered(user, guildId)
        return !!isRegisted 
    },
    
    async userExists(message, guildId) {
        const userExists = await registrationServices.isUserRegistered(message.author, guildId)
        if (userExists)
            throw new ArgumentError(`Usuário já cadastrado`)
    },

    async nicknameExists(nickname, guildId) {
        const nicknameExists = await registrationServices.nicknameExists(nickname, guildId)
        if (nicknameExists)
            throw new ArgumentError(`Nickname "${nickname}" já exite`)   
        if (!nickname.match(/[\s\w]+/g))
            throw new ArgumentError(`Nickname inválido! Tente novamente`)
    }
}