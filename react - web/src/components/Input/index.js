import React from 'react';
import './style.css'
const Input = ({onChange, value, type, placeholder, required}) => {
  return <input placeholder={placeholder} type={type}  onChange={onChange} value={value} required={required}/> 
}

export default Input;