const ArgumentError = require('../errors')
const challengeServices = require('../services/challenge')
const validators = require('../validators/challange')
const registerValidators = require('../validators/register')
const messages = require('../messages/announces')

module.exports = {
    
    async challengeValidate(message, args) {
        const options = ['pedra', 'papel', 'tesoura']
        
        try {
            
            const isRegistered = await registerValidators.isRegistered(message.author)
            if (!isRegistered)  
                throw new ArgumentError('Você não está cadastrado')

            const user = await validators.verifyMentionedUsers(message)
            
            const isChallangedRegistered = await registerValidators.isRegistered(user)
            if (!isChallangedRegistered)
                throw new ArgumentError('Quem você tentou desafiar não tem cadastro')

            const [, play] = args
            validators.verifyPlays(options, play)

            await validators.hasPendingGames(message)
            
            message.delete()
            
            return [user, play]
        
        } catch(err) {
            if (err instanceof ArgumentError)
                message.channel.send({
                    embed: messages.announceWarning(err.message)
                })
            else
                console.log('Erro ao desafiar ' + err)
            return null
        }

    },

    async challenge(message, args) {
        const options = await args
        if (!options) return
        const [user, play] = options
        try {
            await challengeServices.registerChallange(message.author, user, play)
            message.channel.send({embed: messages.announceChallange(message.author, user)})
        } catch (err) {
            if (!err instanceof ArgumentError)
                console.log('Houve um erro no desafio: ' + err)
            message.channel.send({
                embed: messages.announceError('Houve um erro no desafio. Tente novamente mais tarde!')
            })
        }
    },

    async acceptValidate(message, args) {
        const options = ['pedra', 'papel', 'tesoura']
        
        try {
            
            await registerValidators.isRegistered(message)

            const user = validators.verifyMentionedUsers(message)
            
            const game = await challengeServices.findPendingGame(user, message.author)
            if (!game)
                throw new ArgumentError('Não há jogo pare aceitar')

            const [, play] = args
            validators.verifyPlays(options, play)

            message.delete()
            
            return [user, play, game]
        
        } catch(err) {
            if (err instanceof ArgumentError)
                message.channel.send({
                    embed: messages.announceWarning(err.message)
                })
            else
                console.log('Erro ao desafiar ' + err)
            return null
        }
    },

    async accept(message, args) {
        const options = await args
        if (!options) return

        const [user, play, game] = options
        
        const players = [user, message.author]
        const [challenger, challenged] = players
        
        const plays = [game.challengerPlay, play]
        const [play1, play2] = plays

        const winnerId = this.verifyWinner(play1, play2) - 1
        const winner = players[winnerId]
        try {
            await challengeServices.registerMatch(challenger, challenged, winner)
            if (winner) {
                const looser = players.find(player => player != winner)
                const winningPlay = plays[winnerId]
                const loosingPlay = plays.find(play => play != winningPlay)
                message.channel.send({
                    embed: messages.announceResults(winner, looser, winningPlay, loosingPlay)
                })
            }
            else
                message.channel.send({
                    embed: messages.announceDraw(challenger, challenged, play)
                })
        } catch (err) {
            message.channel.send({
                embed: messages.announceError('Houve um erro ao registrar a partida. Tente novamente')
            })
        }
    },

    async refuseValidate(message, args) {
        try {
            await registerValidators.isRegistered(message)
            const user = await validators.verifyMentionedUsers(message)
            return user
        } catch(err) {
            if (err instanceof ArgumentError)
                message.channel.send({
                    embed: messages.announceWarning(err.message)
                })
            console.log('Erro recusar jogo: ' + err)
            return null
        }
    },

    async refuse(message, args) {
        const challenger = await args
        if (!challenger) return
        try {
            await challengeServices.refuseMatch(message.author, challenger)
            const messageSent = await message.channel.send({
                embed: messages.announceRefuse(challenger, message.author)
            })
            messageSent.react('🐔')
        } catch (err) {
            message.channel.send({
                embed: messages.announceError('Erro ao recusar partida')
            })
            console.log('Erro ao recusar partida ' + err)    
        }

    },

    async cancel(message, args) {
        try {
            const pendingGame = await challengeServices.deletePendingGame(message.author)
            const challenged = await message.guild.members.fetch(pendingGame.challengedId)
            if (!pendingGame)
                throw new ArgumentError('Não há jogo para cancelar!')
            message.channel.send({
                embed: messages.announceCancel(message.author, challenged)
            })
        } catch (err) {
            if (err instanceof ArgumentError)
                return message.channel.send({
                    embed: messages.announceError(err.message)
                })
            console.log('Erro ao cancelar desafio: ' + err)
            message.channel.send({
                embed: messages.announceError(`Erro ao cancelar o desafio de ${message.author}`)
            })
        }
    },

    verifyWinner(p1, p2) {
        if (p1 == 'pedra') {
            if (p2 == 'papel') return 2
            if (p2 == 'tesoura') return 1
        } 
        else if (p1 == 'papel') {
            if (p2 == 'tesoura') return 2
            if (p2 == 'pedra') return 1
        }
        else if (p1 == 'tesoura') {
            if (p2 == 'pedra') return 2
            if (p2 == 'papel') return 1
        }
        return 0
    }

}