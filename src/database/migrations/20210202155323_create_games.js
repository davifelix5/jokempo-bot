
exports.up = function(knex) {
    return knex.schema.createTable('games', table => {
        table.increments('id')
        table.string('player1_id')
        table.string('player2_id')
        table.string('winnerId')
        table.string('guildId')
        table.boolean('refused').defaultTo(null)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        
        table.foreign(['player1_id', 'guildId']).references(['userId', 'guildId']).inTable('users')
            .onDelete('CASCADE')
        table.foreign(['player2_id', 'guildId']).references(['userId', 'guildId']).inTable('users')
            .onDelete('CASCADE')
        table.foreign(['winnerId', 'guildId']).references(['userId', 'guildId']).inTable('users')
            .onDelete('CASCADE')
      })
  };
  
  exports.down = function(knex) {
    
  };
  