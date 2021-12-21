const challangeServices = require('../services/challenge')
const ArgumentError = require('../errors')

module.exports = {

    verifyMentionedUsers(message) {
        const usersMentioned = Array.from(message.mentions.users)
        if (!usersMentioned.length) {
            throw new ArgumentError('Mencione um usuário para jogar!')
        }
        const [[,user]] = usersMentioned
        if (user == message.author)
            throw new ArgumentError('Você não pode desafiar a si mesmo')
        return user
    },

    verifyPlays(options, play) {
        if (!play) {
            throw new ArgumentError(`Informe uma jogada (pedra, papel, tesoura)`)
        }
        if (!options.includes(play.toLowerCase())) {
            throw new ArgumentError(`A jogada "${play}" não é válida!`)
        }
    },

    async hasPendingGames(message) {
        const hasPedingGames = await challangeServices.hasPendingGames(message.author)
        if (hasPedingGames)
            throw new ArgumentError(`Você já tem jogos pendentes! Termine-os ou cancele-os antes`)
    },
}