const knex = require('../../database/connection')

module.exports = {

    async deletePendingGame(user) {
        const query =  knex('pending_games')
            .where('challengerId', user.id)
        const [game] = await query
        await query.del()
        return game
    },
    
    async hasPendingGames(user) {
        const pendingGames = await knex('pending_games').select('*').where('challengerId', user.id)
        return !!pendingGames.length
    },

    async registerChallange(challenger, challenged, challengerPlay) {
        await knex('pending_games').insert({
            challengerId: challenger.id,
            challengedId: challenged.id,
            challengerPlay,
        }) 
    },

    async findPendingGame(challenger, challenged) {
            const [game] = await knex('pending_games')
            .select('*')
            .where({
                challengerId: challenger.id,
                challengedId: challenged.id,
            })
            return game
    },

    async registerMatch(challenger, challenged, winner) {
    
        const trx = await knex.transaction()

        await trx('games').insert({
            'player1_id': challenger.id,
            'player2_id': challenged.id,
            'winnerId': winner ? winner.id : null
        })
        await trx('pending_games').where({
            challengerId: challenger.id,
            challengedId: challenged.id,
        }).del()
        
        await trx.commit()

    },

    async refuseMatch(user, challenger) {
        
        const trx = await knex.transaction()

        await trx('pending_games')
        .where({
            challengerId: challenger.id,
            challengedId: user.id,
        })
        .del()
        
        await trx('games').insert({
            'player1_id': challenger.id,
            'player2_id': user.id,
            'refused': true
        })

        await trx.commit()
    },

}