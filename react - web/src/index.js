import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { DndProvider, DragDropContext } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRouter from './components/PrivateRouter'
import Login from './pages/login'
import Registro from './pages/registro';
import Projetos from './pages/projetos';
import Tarefas from './pages/tarefa';
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/registre-se" component={Registro} />
            <PrivateRouter path="/meus-projetos"  exact={true} component={Projetos} />
            <DndProvider backend={HTML5Backend} >
                <PrivateRouter path="/meus-projetos/:slug" component={Tarefas} />
            </DndProvider>
        </Switch>
    </BrowserRouter>
    ,
    document.getElementById('root')
);