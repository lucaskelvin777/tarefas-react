import React, { useState, useEffect } from 'react';
import Input from './../../components/Input';
import Button from './../../components/Button';
import ButtonNavigate from './../../components/ButtonNavigate';
import Service from './../../services/api';
import { isEmail } from '../../Utils';
import { Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ToastPersonality from './../../components/ToastPersonality';
import ContainerToast from './../../components/ContainerToast';
const Registro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [userName, setUserName] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [notificacao, setNotificacao] = useState({ msg: '', type: '' });
  const [redirecionar, setRedirecionar] = useState(false);
  async function submitMessage() {
    if (!enviando) {
      try {
        if (userName.length < 6 && userName.length > 12) {
          setNotificacao({ msg: '*Obs: o campo usuário deve conter pelo menos 6 caracteres  e no máximo 12 caracteres', type: 'alert alert-danger' })
          return false;
        }
        if (senha.length < 6 && senha.length > 12) {
          setNotificacao({ msg: '*Obs: o campo senha deve conter pelo menos 6 caracteres  e no máximo 12 caracteres', type: 'alert alert-danger' });
          return false;
        }
        if (!isEmail(email)) {
          setNotificacao({ msg: '*Obs: Email invalido', type: 'alert alert-danger' });
          return false;
        }
        setEnviando(true);
        setNotificacao({ msg: '*Obs, acessando servidor!', type: 'alert alert-warning' })
        let data = await Service().post('/register', { username: userName, email: email, password: senha })
        let dados = [];
        if (data.data === undefined)
          return false;

        dados = data.data;
        if (dados.status) {
          setNotificacao({ type: 'alert alert-success', msg: dados.msg })
          localStorage.setItem('token', dados.token);
          sessionStorage.setItem('token', dados.token)
          localStorage.setItem('email', email)
          sessionStorage.setItem('email', email)
          sessionStorage.setItem('mensagemBoasVindas', "Seja muito bem vindo!");
          setRedirecionar(true);
        } else {
          setNotificacao({ type: 'alert alert-danger', msg: dados.msg });
        }
      } catch (ex) {
        setNotificacao({ msg: 'Ocorreu um erro ao comunicar com o servidor', type: 'alert alert-danger' });
        ToastPersonality('Não foi possivel criar sua conta','danger');
      }
      

      setEnviando(false);
    }
  }
  function handleUserName(value) {
    if (userName.length <= 13) {
      setUserName(value.replace(/ /g, ''));
    }
    if (value.length < userName.length)
      setUserName(value);
  }

  useEffect(() => {
    if (!isEmail(email)) {
      setNotificacao({ msg: '*Obs: Email invalido', type: 'alert alert-warning' });
    } else {
      setNotificacao({ type: '', msg: '' });
    }
  }, [email]);
  useEffect(() => {
    if (senha.length < 6 && senha.length > 12) {
      setNotificacao({ msg: '*Obs: senha deve conter pelo menos 6 caracteres  e no maximo 12 caracteres', type: 'alert alert-danger' });
    } else {
      setNotificacao({ type: '', msg: '' });
    }
  }, [senha]);
  useEffect(() => {
    if (userName.length < 6 && userName.length > 12) {
      setNotificacao({ msg: '*Obs: senha deve conter pelo menos 6 caracteres  e no maximo 12 caracteres', type: 'alert alert-danger' });
    } else {
      setNotificacao({ type: '', msg: '' });
    }
  }, [userName]);
  function handleEmail(value) {
    setEmail(value);
  }
  function handlePassword(value) {
    if (value.length < 12)
      setSenha(value);
    else
      setNotificacao({ msg: '*Obs: Só é possivel senha até com 12 caracteres', type: 'alert alert-danger' });
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    submitMessage();
  }
  if (redirecionar || localStorage.getItem('token') !== null) {
    return (
      <Redirect to="/meus-projetos" />
    )
  }
  return (
    <div className="container">
      <div className="bloco-principal">
        <h1>Registre - se</h1>
        <ContainerToast />

        <hr />
        <div className={notificacao.type}>
          <p>{notificacao.msg}</p>
        </div>
        <form onSubmit={handleFormSubmit} className="formulario">

          <Input type="text" onChange={(e) => { handleUserName(e.target.value) }} value={userName} placeholder="Digite aqui seu usúario" required />
          <Input type="email" onChange={(e) => { handleEmail(e.target.value) }} value={email} placeholder="Digite aqui seu email" required />
          <Input type="password" onChange={(e) => { handlePassword(e.target.value) }} value={senha} placeholder="Digite aqui sua senha" required />
          <Button>Cadastrar-se</Button>
        </form>
        <hr />
        <div className="bloco-secundario">
          Já é cadastrado ?
           &nbsp;<ButtonNavigate to="/">Entre aqui</ButtonNavigate>
        </div>
      </div>
    </div>
  );
}

export default Registro;