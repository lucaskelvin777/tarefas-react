import React, { useState, useEffect } from 'react';
import './App.css';
import ZoneDrop from './../../components/zoneDrop';
import DragItem from './../../components/dragItem';
import Menu from '../../components/Menu'
import { connectionWithToken } from './../../services/api';
import 'react-toastify/dist/ReactToastify.css';
import ToastPersonality from './../../components/ToastPersonality';
import ContainerToast from './../../components/ContainerToast';
import { Redirect } from 'react-router-dom'

function App({ match }) {
  const [carregando, setCarregando] = useState(true);
  const [todo, setTodo] = useState([]);
  const [inDoing, setInDoing] = useState([]);
  const [complete, setComplete] = useState([]);
  const [novoItem, setNovoItem] = useState('');
  const [inSubmiting, setInSubmiting] = useState(false);
  const [redirecionarHome, setRedirecionarHome] = useState(false);
  const [projeto, setProjeto] = useState('');
  useEffect(() => {
    if (inSubmiting === true) {
      ToastPersonality('Aguarde, salvando !','warning')
    }
  }, [inSubmiting]);
  function retirarId(id) {
    setTodo([]);
    var arr = [];
    for (let i = 0; i < todo.length; i++) {
      if (todo[i].id != id) {
        arr.push(todo[i])
      }
    }
    setTodo(arr);

    setInDoing([]);
    arr = [];
    for (let i = 0; i < inDoing.length; i++) {
      if (inDoing[i].id != id) {
        arr.push(inDoing[i])
      }
    }
    setInDoing(arr);


    setComplete([]);
    arr = [];
    for (let i = 0; i < complete.length; i++) {
      if (complete[i].id != id) {
        arr.push(complete[i])
      }
    }
    setComplete(arr);
  }
  async function deleteForServer(id) {
    try {
      await connectionWithToken().delete('/tarefas/' + id);
      ToastPersonality('Tarefa deletada', 'danger')

    } catch (ex) {
      ToastPersonality('Ocorreu um erro ao deletar', 'danger')
    }
  }

  function verificarDado(id, type) {
    if (type === 'todo') {
      for (let i = 0; i < todo.length; i++) {
        if (todo[i].id === id)
          return false;
      }
    } else if (type === 'inDoing') {
      for (let i = 0; i < inDoing.length; i++) {
        if (inDoing[i].id === id)
          return false;
      }
    } else if (type === 'complete') {
      for (let i = 0; i < complete.length; i++) {
        if (complete[i].id === id)
          return false;
      }
    }
    return true;




  }
  function changeDados(type, id, text) {
    var arr = [];
    if (!verificarDado(id, type)) {
      return;
    }
    retirarId(id);

    if (type === 'todo') {
      setTodo([]);
      arr = [];
      arr = todo;
      arr.push({ texto: text, id })
      changeStatus(id, 1)
      setTodo(arr);
    } else if (type === 'inDoing') {
      setInDoing([])
      arr = [];
      arr = inDoing;
      arr.push({ texto: text, id })
      changeStatus(id, 2)
      setInDoing(arr);
    } else if (type === 'complete') {
      setComplete([])
      arr = [];
      arr = complete;
      arr.push({ texto: text, id })
      changeStatus(id, 3)
      setComplete(arr);
    }
  }
  async function novo() {
    if (novoItem.length <= 2) {
      return;
    }
    if (!inSubmiting) {
      setInSubmiting(true);
      let data = await connectionWithToken().post('/tarefas', { texto: novoItem, slug: match.params.slug })
      let dados = data.data;
      setTodo([]);
      let arr = [];
      arr = todo;
      arr.push({ id: dados.id, texto: novoItem });
      setTodo(arr);
      setNovoItem('');
      setInSubmiting(false);
      ToastPersonality('Tarefa salva com sucesso!', 'success')
    }
  }
  async function changeStatus(id, status) {
    await connectionWithToken().put('/tarefas/' + id, { status })

  }
  function handleForm(event) {
    event.preventDefault();
    novo();
  }
  useEffect(() => {
    async function get() {
      try {
        let data = await connectionWithToken().get('/tarefas/' + match.params.slug)
        if (data.data.status === false) {
          setRedirecionarHome(true);

        }
        let dados = data.data.tarefas;
        let arrTodo = [];
        let arrInDoing = [];
        let arrComplete = [];

        dados.map(element => {
          if (element.status === 1)
            arrTodo.push(element)
          else if (element.status === 2)
            arrInDoing.push(element)
          else if (element.status === 3)
            arrComplete.push(element)
        });
        setTodo(arrTodo);
        setInDoing(arrInDoing);
        setComplete(arrComplete);
        setProjeto(data.data.nomeProjeto)
        setCarregando(false);
      } catch (ex) {

      }
    }
    get();
  }, []);
  if (redirecionarHome) {
    sessionStorage.setItem('alerta', 'Não foi possivel encontrar esse projeto!');
    return (
      <Redirect to="/meus-projetos" />
    )
  }
 
  if (carregando) {
    return (
      <><h1 style={{ textAlign: 'center' }}>Carregando...</h1><ContainerToast /></>
    )
  }

  return (
    <>
      <Menu />
      <div className="container">
        <ContainerToast />
        <div className="bloco-principal">

          <h1>Tarefas - {projeto}</h1>
          <hr />
          <div className="container-2">
            <form className="form" onSubmit={handleForm}>
              <input
                className="input"
                placeholder="Coloque uma nova tarefa"
                onChange={e => setNovoItem(e.target.value)} value={novoItem} />

              <button className="btn">Adicionar nova tarefa</button>
            </form>
          </div>

          <div className="bloco-items">
            <div className="bloco">
              <h3>A fazer</h3>
              <hr />

              <ZoneDrop changeDados={changeDados} type="todo" >
                {todo.map(element => (
                  <>
                    <DragItem key={element.id} text={element.texto} identificacao={element.id} >
                      <p>{element.texto}</p>
                      <button className="btn" onClick={() => { retirarId(element.id); deleteForServer(element.id); }}>X</button>
                    </DragItem>
                  </>
                ))}
              </ZoneDrop>
            </div>
            <div className="bloco" >
              <h3>Em andamento</h3>
              <hr />
              <ZoneDrop changeDados={changeDados} type="inDoing" >
                {inDoing.map(element => (
                  <DragItem key={element.id} text={element.texto} identificacao={element.id}>
                    <p>{element.texto}</p>
                    <button className="btn" onClick={() => { retirarId(element.id); deleteForServer(element.id); }}>X</button>
                  </DragItem>
                ))}
              </ZoneDrop>
            </div>
            <div className="bloco">
              <h3>Completado</h3>
              <hr />
              <ZoneDrop changeDados={changeDados} type="complete" >
                {complete.map(element => (
                  <DragItem key={element.id} text={element.texto} identificacao={element.id}>
                    <p>{element.texto}</p>
                    <button className="btn" onClick={() => { retirarId(element.id); deleteForServer(element.id); }}>X</button>
                  </DragItem>
                ))}
              </ZoneDrop>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
