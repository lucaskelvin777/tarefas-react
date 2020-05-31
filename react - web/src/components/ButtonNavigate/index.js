import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';
const ButtonNavigate = ({to, children}) => {
  return (
      <Link to={to} className="link-navigation">{children}</Link>
  );
}

export default ButtonNavigate;