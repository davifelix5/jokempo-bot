
exports.up = function(knex) {
	return knex.schema.createTable('users', table => {
		table.string('userId')
		table.string('nickname')
		table.string('guildId').notNullable()
		table.integer('points').defaultTo(0)
		table.boolean('confirmedUnregistration').defaultTo(false)
		table.primary(['userId', 'guildId'])
		table.unique(['nickname', 'guildId'])
	})
};
	
exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users')
};
