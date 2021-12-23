const registrationServices = require('../services/register')
const ArgumentError = require('../../errors')

module.exports = {
    
    async isRegistered(user) {
        const isRegisted = await registrationServices.isUserRegistered(user)
        return !!isRegisted 
    },
    
    async userExists(message) {
        const userExists = await registrationServices.isUserRegistered(message.author)
        if (userExists)
            throw new ArgumentError(`Usuário já cadastrado`)
    },

    async nicknameExists(nickname) {
        const nicknameExists = await registrationServices.nicknameExists(nickname)
        if (nicknameExists)
            throw new ArgumentError(`Nickname "${nickname}" já exite`)   
        if (!nickname.match(/[\s\w]+/g))
            throw new ArgumentError(`Nickname inválido! Tente novamente`)
    }
}