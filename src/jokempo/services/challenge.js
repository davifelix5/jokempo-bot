const knex = require('../../database/connection')

module.exports = {

    async deletePendingGame(user, guildId) {
        const query =  knex('pending_games')
            .where({
                'challengerId': user.id,
                'guildId': guildId,
            })
        const [game] = await query
        await query.del()
        return game
    },
    
    async hasPendingGames(user, guildId) {
        const pendingGames = await knex('pending_games')
            .select('*')
            .where({
                'challengerId': user.id,
                'guildId': guildId,
            })
        return !!pendingGames.length
    },

    async registerChallange(challenger, challenged, challengerPlay, guildId) {
        await knex('pending_games').insert({
            challengerId: challenger.id,
            challengedId: challenged.id,
            challengerPlay,
            guildId,
        }) 
    },

    async findPendingGame(challenger, challenged, guildId) {
            const [game] = await knex('pending_games')
            .select('*')
            .where({
                challengerId: challenger.id,
                challengedId: challenged.id,
                guildId,
            })
            return game
    },

    async registerMatch(challenger, challenged, winner, guildId) {
    
        const trx = await knex.transaction()

        await trx('games').insert({
            'player1_id': challenger.id,
            'player2_id': challenged.id,
            'winnerId': winner ? winner.id : null,
            'guildId': guildId
        })
        await trx('pending_games').where({
            challengerId: challenger.id,
            challengedId: challenged.id,
            guildId,
        }).del()
        
        await trx.commit()

    },

    async refuseMatch(user, challenger, guildId) {
        
        const trx = await knex.transaction()

        await trx('pending_games')
        .where({
            challengerId: challenger.id,
            challengedId: user.id,
            guildId,
        })
        .del()
        
        await trx('games').insert({
            'player1_id': challenger.id,
            'player2_id': user.id,
            'refused': true,
            'guildId': guildId
        })

        await trx.commit()
    },

}