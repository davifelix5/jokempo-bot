const ArgumentsError = require('../errors')
const rankingServices = require('../services/ranking')
const messages = require('../messages/announces')
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
        const totalCount = await rankingServices.countUsers()
        if (columnName === 'help')
            return message.channel.send({embed: rankMessages.rankHelp()})
        try {
            const [rows, totalPages] = await rankingServices.getRankingInfo(columnName, page, message.channel.guild.id, ascendentOrdenation)
            if (!rows.length) return message.channel.send({embed: messages.announceWarning('Não há registros no ranking')})
            for (user of rows) {
                const member = await message.guild.members.fetch(user.userId)
                user.nickname = member.nickname || member.user.username
                delete user.userId
            }
            message.channel.send({embed: rankMessages.announceRank(columnName, rows, page, totalPages, ascendentOrdenation, totalCount)})
                .then(async (rankMessage) => {
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
                            rankMessage.delete()
                        })
                })
                .catch(err => {
                    message.channel.send({embed: messages.announceError('Erro ao formar rank. Tente mais tarde!')})
                })
        } catch (err) {
            return message.channel.send({embed: messages.announceError('Erro ao recuperar o rank. Tente novamente mais tarde!')})
        }
    },

}