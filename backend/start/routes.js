'use strict'

const Route = use('Route')
Route.post('/auth', 'AuthController.auth');
Route.post('/register', 'AuthController.register');

Route.get('/projeto', 'ProjetoController.index').middleware('auth');
Route.post('/projeto', 'ProjetoController.store').middleware('auth');
Route.delete('/projeto/:id', 'ProjetoController.delete').middleware('auth');

Route.get('/tarefas/:slug', 'TarefaController.index').middleware('auth');
Route.post('/tarefas', 'TarefaController.store').middleware('auth');
Route.put('/tarefas/:id', 'TarefaController.update').middleware('auth');
Route.delete('/tarefas/:id', 'TarefaController.delete').middleware('auth');