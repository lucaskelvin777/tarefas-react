'use strict'
  const User = use('App/Models/User')
class AuthController {
  async auth({request, auth}){
    const {email, password} = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }
  async register({request,auth}){
    const data = request.only(['username','email', 'password']);
    let usersFinds = await User.query()
    .whereRaw('username = ? or email = ?', [data.username, data.email])
    .fetch();
    
    if(usersFinds.rows.length>=1){
        return {status: false, msg : 'Email / Usuário já cadastrado ! '};
    }
    
    const user = await User.create(data);
    const token = await auth.attempt(user.email, data.password);
    return {token: token.token, msg:'Seja muito bem vindo!',status:true};
  }
}

module.exports = AuthController
