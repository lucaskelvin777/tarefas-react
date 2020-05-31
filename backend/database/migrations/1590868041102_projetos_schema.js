'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjetosSchema extends Schema {
  up () {
    this.create('projetos', (table) => {
      table.increments()
      table.timestamps()
      table.string('slug', 255).notNullable().unique()
      table.string('nome', 255).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').defaultTo(1)
    })
  }

  down () {
    this.drop('projetos')
  }
}

module.exports = ProjetosSchema
