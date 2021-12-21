
exports.up = function(knex) {
	return knex.schema.createTable('users', table => {
		table.string('userId').primary()
		table.string('nickname').unique()
        table.string('guildId').notNullable()
		table.integer('points').defaultTo(0)
        table.boolean('confirmedUnregistration').defaultTo(false)
	})
};
	
exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users')
};
