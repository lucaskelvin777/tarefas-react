import React from 'react';
import './style.css';
const BlocoProjeto = ({ nome, data, onclick, newBloco, acaoNewBloco }) => {
  if(newBloco){
    return (
      <div className="bloco-projeto novo-projeto" onClick={acaoNewBloco}>
      Novo projeto
      <hr />
      
    </div>
    )
  }
  return (
    <div className="bloco-projeto" onClick={onclick}>
      {nome}
      <hr />
      {data}
    </div>
  );
}

export default BlocoProjeto;