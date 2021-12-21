
exports.up = function(knex) {
    return knex.schema.createTable('pending_games', table => {
		table.increments('id')
		table.string('challengerId').unsigned().notNullable()
		table.string('challengedId').unsigned().notNullable()
		table.enu('challengerPlay', ['pedra', 'papel', 'tesoura']).notNullable()
		table.timestamp('created_at').defaultTo(knex.fn.now())
		
		table.foreign('challengerId').references('userId').inTable('users')
		table.foreign('challengedId').references('userId').inTable('users')
	})
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('pending_games')
};
  