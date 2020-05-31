import React, { useState, useEffect } from 'react';
import BlocoProjeto from '../../components/BlocoProjeto';
import { Redirect } from 'react-router-dom';
import { connectionWithToken } from '../../services/api';
import Modal from 'react-modal';
import Input from '../../components/Input'
import Button from '../../components/Button'
import Menu from '../../components/Menu'
import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import ToastPersonality from './../../components/ToastPersonality';
import ContainerToast from './../../components/ContainerToast';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#222'
  }
};
const Projetos = () => {
  const [redirecionar, setRedirecionar] = useState(false)
  const [slug, setSlug] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [nomeNovoProjeto, setNomeNovoProjeto] = useState('');
  useEffect(() => { getDados(); }, []);
  useEffect(() => {
    showMessageSession();
    showMessageBemVindo();
  }, [carregando]);
  function showMessageSession() {
    if (sessionStorage.getItem('alerta') !== null && carregando === false) {
      ToastPersonality(sessionStorage.getItem('alerta'), 'danger');
      sessionStorage.removeItem('alerta');
    }
  }
  function showMessageBemVindo() {
    if (sessionStorage.getItem('mensagemBoasVindas') !== null && carregando === false) {
      ToastPersonality(sessionStorage.getItem('mensagensBoasVindas'), 'danger');
      sessionStorage.removeItem('mensagensBoasVindas');
    }
  }



  function navigateToProject(slug) {
    setRedirecionar(true);
    setSlug(slug);
  }

  async function saveNovoProjeto(e) {
    e.preventDefault();
    if (nomeNovoProjeto.length < 4) {
      ToastPersonality('o nome é necessario no minimo ter 4 caracteres', 'danger')
      return;
    }
    setCarregando(true);
    try {

      let data = await connectionWithToken().post('/projeto', { nome: nomeNovoProjeto })
      let dados = [];
      dados = data.data;
      setCarregando(false);
      setSlug(dados.slug);
      setRedirecionar(true);
      ToastPersonality('Projeto Criado com sucesso!', 'success')
    } catch (ex) {
      ToastPersonality('Não foi possivel criar seu projeto, tente novamente mais tarde', 'danger')
    }
  }
  function newProject() {

    setModalOpen(true);
  }
  async function getDados() {
    try {
      let data = await connectionWithToken().get('/projeto')
      let dados = [];
      dados = data.data;
      setDados(dados);
      setCarregando(false);

    } catch (ex) {
      ToastPersonality('Não foi possivel trazer dados', 'danger');
    }
  }
  if (redirecionar) {
    return <Redirect to={'/meus-projetos/' + slug} />
  }
  if (carregando) {
    return <><h1 style={{ textAlign: 'center' }}>Aguarde, Carregando...</h1> <ContainerToast /></>
  }
  return (

    <>
      <Menu />
      <div className="container">
        <ContainerToast />
        <Modal
          isOpen={modalOpen}
          //onAfterOpen={afterOpenModal}
          onRequestClose={() => { setModalOpen(false) }}
          style={customStyles}
          contentLabel="Cadastrar novo projeto"
        >
          <h1 className="titulo">Novo Projeto</h1>
          <hr />
          <form className="formulario centralizar-conteudo-div" onSubmit={saveNovoProjeto}>
            <Input value={nomeNovoProjeto} onChange={e => setNomeNovoProjeto(e.target.value)} required />
            <Button>Cadastrar novo projeto</Button>
          </form>
        </Modal>
        <div className="bloco-principal ">
          <h1>Meus projetos</h1>
          <hr />
          <div className="blocos">
            {dados.map(element => (
              <BlocoProjeto nome={element.nome} data={element.created_at} onclick={() => { navigateToProject(element.slug) }} />
            ))}
            <BlocoProjeto acaoNewBloco={() => {
              newProject()
            }} newBloco />
          </div>
        </div>
      </div>
    </>
  );
}

export default Projetos;