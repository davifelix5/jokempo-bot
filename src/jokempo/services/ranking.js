const knex = require('../../database/connection')

module.exports = {
    pageSize: 1,
    async countUsers(guildId) {
        const [{count}] = await knex('users')
            .where({guildId})
            .count('*')
        return Number(count)
    },
    async getRankingInfo(column, page, guildId, ascendentOrdenation) {
        const ordenation = ascendentOrdenation ? 'ASC' : 'DESC'
        const columns = ['wins', 'losses', 'draws', 'refused']
        if (!columns.includes(column))
            throw new Error('Invalid column to rank')

        const count = await this.countUsers(guildId)
        const pages = Math.ceil(count / this.pageSize)
        if (page > pages) {
            return []
        }
        
        const result = await knex
            .select(
                'users.userId', 
                'users.nickname', 
                knex.raw('SUM(CASE WHEN "games"."winnerId" = "users"."userId" THEN 1 ELSE 0 END) AS wins'),
                knex.raw('SUM(CASE WHEN "games"."winnerId" IS not NULL AND "games"."winnerId" != "users"."userId" THEN 1 ELSE 0 END) AS losses'),
                knex.raw(`SUM(CASE WHEN "games"."winnerId" IS NULL AND "games"."refused" IS NULL AND ("games"."player1_id" = "users"."userId" OR "games"."player2_id" = "users"."userId") THEN 1 ELSE 0 END) AS draws`),
                knex.raw('SUM(CASE WHEN "games"."refused" = TRUE AND "games"."player2_id" = "users"."userId" THEN 1 ELSE 0 END) AS refused'),
            )
            .from('games')
            .join('users', function() {
                this.on('games.player1_id', '=', 'users.userId').orOn('games.player2_id', '=', 'users.userId')
            })
            .where('users.guildId', '=', guildId)
            .andWhere('games.guildId', '=', guildId)
            .groupBy(['users.userId', 'users.nickname'])
            .orderBy(column, ordenation)
            .limit(this.pageSize)
            .offset(this.pageSize * (page -1))
        

        return [result, pages]
    }
}