
exports.up = function(knex) {
    return knex.schema.createTable('pending_games', table => {
		table.increments('id')
		table.string('challengerId').unsigned().notNullable()
		table.string('challengedId').unsigned().notNullable()
		table.enu('challengerPlay', ['pedra', 'papel', 'tesoura']).notNullable()
		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.string('guildId')
		
		table.foreign(['challengerId', 'guildId']).references(['userId', 'guildId']).inTable('users')
			.onDelete('CASCADE')
		table.foreign(['challengedId', 'guildId']).references(['userId', 'guildId']).inTable('users')
			.onDelete('CASCADE')
	})
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('pending_games')
};
  