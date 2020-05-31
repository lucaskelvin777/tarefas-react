import React, { useState, useEffect } from 'react';
import Input from './../../components/Input';
import Button from './../../components/Button';
import ButtonNavigate from './../../components/ButtonNavigate';
import Service from './../../services/api';
import { Redirect } from 'react-router-dom'



/**Para usar o toast tem que importar esses 3 */
import 'react-toastify/dist/ReactToastify.css';
import ToastPersonality from './../../components/ToastPersonality'
import ContainerToast from './../../components/ContainerToast';


import './style.css';
function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [notificacao, setNotificacao] = useState({ msg: '', type: '' });
  const [redirecionar, setRedirecionar] = useState(false);
  useEffect(()=>{
    showMessageNoAuth();
  }, [])
  function showMessageNoAuth(){
    if(sessionStorage.getItem('auth') !== null){
      ToastPersonality('Você não tem permissão para acessar essa página!', 'danger');
      sessionStorage.removeItem('auth')
    }
  }
  async function handleSubmitForm(event) {
    event.preventDefault();
    if (!enviando) {
      setEnviando(true);
      setNotificacao({ msg: 'Aguarde, enviando ao servidor', type: 'alert alert-warning' })
      try {
        let data = await Service().post('/auth', { email, password: senha });
        let dados = [];
        if (data.data === undefined) {
          ToastPersonality('Ocorreu um erro ao comunicar com o servidor', 'danger')
          setNotificacao({ msg: 'Não foi possivel comunicar com o servidor', type: 'alert alert-danger' })
          return false;
        }
        dados = data.data;
        if (dados.token !== undefined) {
          ToastPersonality('Seja bem vindo!', 'success')
          setNotificacao({ msg: 'Entrando...', type: 'alert alert-success' });
          localStorage.setItem('token', dados.token)
          sessionStorage.setItem('token', dados.token)
          localStorage.setItem('email', email)
          sessionStorage.setItem('email', email)
          setRedirecionar(true);
        } else {
          ToastPersonality('Email/senha Incorreto', 'danger')
          setNotificacao({ msg: 'Email/Senha incorretos', type: 'alert alert-danger' })
        }

      } catch (ex) {
        ToastPersonality('Ocorreu um erro ao comunicar com o servidor', 'danger')
        setNotificacao({ msg: 'Email/Senha incorretos', type: 'alert alert-danger' })
      }
      setEnviando(false);
    }
  }

  if (redirecionar || localStorage.getItem('token') !== null) {
    return (
      <Redirect to="/meus-projetos" />
    )
  }

  return (
    <div className="container">
      <div className="bloco-principal ">
        <ContainerToast />
        <h1>Login</h1>
        <hr />
        <div className={notificacao.type}>
          <p>{notificacao.msg}</p>
        </div>
        <form className="formulario" onSubmit={handleSubmitForm}>
          <Input placeholder="Digite aqui seu email" type="email" onChange={e => setEmail(e.target.value)} value={email} required />
          <Input placeholder="Digite aqui sua senha" type="password" onChange={e => setSenha(e.target.value)} value={senha} required />
          <Button>Acessar</Button>
        </form>
        <hr />
        <div className="bloco-secundario">
          Novo ?
           &nbsp;<ButtonNavigate to="/registre-se">Registre-se aqui</ButtonNavigate>
        </div>
      </div>
    </div>
  )
}
export default Login;
