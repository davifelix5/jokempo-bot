const ArgumentsError = require('../../errors')
const rankingServices = require('../services/ranking')
const messages = require('../../messages')
const rankMessages = require('../messages/rank')

module.exports = {

    rankValidate(message, args) {
        const rankOptions = ['wins', 'losses', 'draws', 'rejections', 'help']
        let [rankOption, ascendentOrdenation] = args
        
        if (rankOption && !rankOptions.includes(rankOption))
            throw new ArgumentsError('Esse campo não existe')
        
        rankOption = rankOption == 'rejections' ? 'refused' : rankOption
        
        return [rankOption || 'wins', ascendentOrdenation == 'asc' ? true: false]

    },

    async rank(message, args, page = 1) {
        const [columnName, ascendentOrdenation] = args
        const guildId = message.channel.guild.id
        const totalCount = await rankingServices.countUsers(guildId)
        if (columnName === 'help')
            return message.channel.send({embed: rankMessages.rankHelp()})
        try {
            const [rows, totalPages] = await rankingServices.getRankingInfo(columnName, page, guildId, ascendentOrdenation)
            if (!rows.length) return message.channel.send({embed: messages.announceWarning('Não há registros no ranking')})
            for (user of rows) {
                const member = await message.guild.members.fetch(user.userId)
                user.nickname = member.nickname || member.user.username
                delete user.userId
            }
            const rankMessage = await message.channel.send({
                embed: rankMessages.announceRank(
                    columnName, 
                    rows, 
                    page, 
                    totalPages, 
                    ascendentOrdenation, 
                    totalCount
                )
            })
            if (totalPages === 1)
                return
            if (page < totalPages)
                await rankMessage.react('⬆️')
            if (page >= totalPages)
                await rankMessage.react('⬇️')
            const filter = (reaction) => ['⬆️', '⬇️'].includes(reaction.emoji.name)
            const THIRTY_SECONDS = 30 * 1000
            rankMessage.awaitReactions(filter, {max: 1, time: THIRTY_SECONDS})
                .then(collected => {
                    const reaction = collected.first()
                    page = reaction.emoji.name == '⬆️' ? page + 1 : page - 1
                    this.rank(message, args, page).catch(() => {
                        message.channel.send({embed: messages.announceError('Erro ao passar a página do rank')})
                    })
                    rankMessage.delete().catch(() => {
                        message.channel.send({embed: messages.announceError('Erro trocar de página')})
                    })
                })
                .catch(() => {
                    rankMessage.reactions.removeAll()
                })
        } catch (err) {
            return message.channel.send({embed: messages.announceError('Erro ao recuperar o rank. Tente novamente mais tarde!')})
        }
    },

}