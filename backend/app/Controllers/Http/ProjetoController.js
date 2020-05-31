'use strict'
const Projeto = use('App/Models/Projeto')
class ProjetoController {
  async index({auth}){
    const {id} = await auth.getUser();
    let data = await Projeto.query().where('user_id', id).fetch();
    return data;
  }
  async store({request, auth}){
    var data = request.all();
    const {id} = await auth.getUser();
    data.user_id = id;
    data.slug = (data.nome.replace(/[^\w\-]+/g, '-').toLowerCase() + Math.random() * 1).replace('.', '')
    let pesquisa = await Projeto.findBy('slug', data.slug);
    while(pesquisa){
      data.slug = (data.nome.replace(/[^\w\-]+/g, '-').toLowerCase() + Math.random() * 1).replace('.', '')
      pesquisa = await Projeto.findBy('slug', data.slug);
    }
    const projeto = await Projeto.create(data);
    return projeto;
  }
  async delete({request,auth, params}){
    var projeto = await Projeto.find(params.id);
    const {id} = await auth.getUser();
    if(projetouser_id !== id)
      return {status: false, msg: 'Não autorizado'}
    projeto.delete();
  }
}

module.exports = ProjetoController
