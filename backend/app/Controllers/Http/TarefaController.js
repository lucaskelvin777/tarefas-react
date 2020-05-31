'use strict'
const Tarefas = use ('App/Models/Tarefa');
const Projeto = use ('App/Models/Projeto');
class TarefaController {
  
  async index({params}){
    let data = await Projeto.findBy('slug', params.slug);
    if(!data){
      return {msg:'não foi encontrado seu projeto', status:false}
    }
    let tarefas = await Tarefas.query().where('projeto_id', data.id).fetch();
    return {tarefas:tarefas, nomeProjeto:data.nome, status:true}
  }
  async store({request}){
    let input = request.only(['slug', 'texto']);
    let data = await Projeto.findBy('slug', input.slug);
    if(!data){
      return {msg:'não foi encontrado seu projeto'}
    }
    var dataForBase = {};
    dataForBase.projeto_id = data.id;
    dataForBase.texto = input.texto;
    const tarefa = await Tarefas.create(dataForBase);
    return tarefa;
  } 
  async delete({params}){
    var tarefa = await Tarefas.find(params.id);
    tarefa.delete();
  }
  async update({request, params}){
    let input = request.all();
    if(input.status > 3 || input.status < 1)
      return {msg:'não valido'}
    var tarefa = await Tarefas.find(params.id);
    if(!tarefa){
        return {msg:'não encontrado esse id'}
    }
    tarefa.status = input.status;
    tarefa.save();
  }
}

module.exports = TarefaController
