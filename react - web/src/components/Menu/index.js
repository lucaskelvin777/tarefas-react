import React, {useState, useEffect} from 'react';
import './style.css';
import {Redirect, Link}  from 'react-router-dom'
const Menu = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [sair, setSair] = useState(false);
  function showDisplay() {
    
    if(menuAberto){
      setMenuAberto(false);
      document.querySelector('#dropdownMenuOptions').classList.remove('mostrar');
      document.querySelector('#dropdownMenuOptions').classList.add('esconder');
    } else {
      setMenuAberto(true);
      document.querySelector('#dropdownMenuOptions').classList.add('mostrar');
      document.querySelector('#dropdownMenuOptions').classList.remove('esconder');
    }
  }
  function sairNavigate(){
    try{
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      setSair(true);
    } catch(ex){
      setSair(true);
    }
  }
  if(sair){
    return <Redirect to="/"/>
  }
  return (
    <>
      <nav className="nav-bar">
        <div>
        <Link to="/meus-projetos" className="brand"> <b>Tarefas</b></Link>
        
        </div>
        <a class="maisOpcoes" onClick={showDisplay}>{localStorage.getItem('email') || sessionStorage.getItem('email')}</a>

      </nav>
      <div className="alinharDireitaMenu">
        <div className="dropdown esconder"  id="dropdownMenuOptions">
          <ul>
            <a onClick={sairNavigate}><li>Sair</li></a>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Menu;