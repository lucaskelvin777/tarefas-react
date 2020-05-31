'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TarefasSchema extends Schema {
  up () {
    this.create('tarefas', (table) => {
      table.increments()
      table.timestamps()
      table.string('texto', 255).notNullable()
      table.integer('projeto_id').unsigned().references('id').inTable('projetos').notNullable()
      table.integer('status').notNullable().defaultTo(1)
    })
  }

  down () {
    this.drop('tarefas')
  }
}

module.exports = TarefasSchema
