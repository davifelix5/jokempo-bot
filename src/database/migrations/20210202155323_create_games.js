
exports.up = function(knex) {
    return knex.schema.createTable('games', table => {
        table.increments('id')
        table.string('player1_id')
        table.string('player2_id')
        table.string('winnerId')
        table.boolean('refused').defaultTo(null)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        
        table.foreign('player1_id').references('userId').inTable('users')
        table.foreign('player2_id').references('userId').inTable('users')
        table.foreign('winnerId').references('userId').inTable('users')
      })
  };
  
  exports.down = function(knex) {
    
  };
  