import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom';
const PrivateRoute = ({ component: Component, token,...rest }) => (
  
    <Route {...rest} render={(prop) => {
      return (
        (localStorage.getItem('token') || sessionStorage.getItem('token'))
        ? <Component  {...prop}/>
        : <>{sessionStorage.setItem('auth', 'sem permissão!')}<Redirect to='/' /></>
    )}} />);


export default PrivateRoute;