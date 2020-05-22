import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Mesa from './pages/mesa';
import MesaCreate from './pages/mesa/mesacreate';
import MesaEdit from './pages/mesa/mesaedit';
import Principal from './pages/principal/';





ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
      <Switch>
            <Route path="/" exact={true} component={Principal} />
            <Route path="/mesa" exact={true} component={Mesa} />
            <Route path="/mesa/create" component={MesaCreate} />
            <Route path="/mesa/show/:id" component={MesaEdit} />
        </Switch>
  
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

