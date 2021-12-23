const knex = require('../../database/connection')

module.exports = {

    async nicknameExists(nickname) {
        const [foundUser] = await knex('users').select('*').where('nickname', nickname)
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
            console.log('Erro cadastrando usuário: ' + e)
            throw err
        }
    },

    async isUserRegistered(user) {
        try {
            const [foundUser] = await knex('users').where('userId', user.id)
            return Boolean(foundUser);
        } catch (err) {
            console.log('Erro ao buscar usuário: ' + err)
            throw err
        }
    },

    async deleteUser(user) {
        try {
            const [foundUser] = await knex('users')
                .select('*')
                .where('userId', user.id)

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

    async cancelUnregistration(user) {
        const [foundUser] = await knex('users').select('*').where('userId', user.id)
        if (foundUser.confirmedUnregistration) {
            await knex('users').select('*').where('userId', user.id).update({
                confirmedUnregistration: 0
            })
            return
        }
        throw new Error('Operação inválida')
    }

}