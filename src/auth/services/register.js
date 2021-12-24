const knex = require('../../database/connection')

module.exports = {

    async nicknameExists(nickname, guildId) {
        const [foundUser] = await knex('users')
        .select('*')
        .where({
            'nickname': nickname,
            'guildId': guildId
        })
        return !!foundUser
    },

    async registerUser(user, nickname, guildId) {
        try {
            await knex('users').insert({
                userId: user.id,
                nickname,
                guildId
            })
        } catch (err) {
            console.log('Erro cadastrando usuário: ' + err)
            throw err
        }
    },

    async isUserRegistered(user, guildId) {
        try {
            const [foundUser] = await knex('users')
                .where({
                    'userId': user.id,
                    'guildId': guildId,
                })
            return Boolean(foundUser);
        } catch (err) {
            console.log('Erro ao buscar usuário: ' + err)
            throw err
        }
    },

    async deleteUser(user, guildId) {
        try {
            const [foundUser] = await knex('users')
                .select('*')
                .where({
                    'userId': user.id,
                    'guildId': guildId,
                })

            const {confirmedUnregistration} = foundUser

            if (!confirmedUnregistration) {
                await knex('users').where('userId', user.id).update({
                    confirmedUnregistration: 1
                })
                return false
            }
            else {
                await knex('users').where('userId', user.id).del()
                return true
            }

        } catch (err) {
            console.log('Erro ao cadastrar usuário: ' + err)
            throw err
        }
    },

    async cancelUnregistration(user, guildId) {
        const [foundUser] = await knex('users')
            .select('*')
            .where({
                'userId': user.id,
                'guildId': guildId
            })
        if (foundUser.confirmedUnregistration) {
            await foundUser.update({
                confirmedUnregistration: 0
            })
            return
        }
        throw new Error('Operação inválida')
    }

}