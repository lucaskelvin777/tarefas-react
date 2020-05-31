import React,{useState, useEffect} from 'react';
import { useDrop } from 'react-dnd'
import { ItemTypes } from './../types'
const ZoneDrop = ({ children, changeDados, type}) => {
  const [inHover, setInHover] = useState('');
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.ITEM_MOVES,
    drop: monitor => changeDados(type,monitor.itemID, monitor.text),
    hover: monitor => setInHover('background-in-zone'),
    collect: monitor => ({
      isOver: setInHover('')
    }),
  })
  return (
    <div className={'dragzone ' + inHover} ref={drop}>
      {children}
    </div>
  );
}

export default ZoneDrop;