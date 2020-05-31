import React from 'react';
import { useDrag } from 'react-dnd'
import { ItemTypes } from './../types'
const DragItem = ({ children, identificacao, text }) => {

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.ITEM_MOVES, itemID: identificacao, text }
  });
  return (
    <div className="item" ref={drag}>
      {children}
    </div>
  );
}

export default DragItem;