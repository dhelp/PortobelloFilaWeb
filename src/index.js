import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Mesa from './pages/mesa';
import MesaCreate from './pages/mesa/mesacreate';
import MesaEdit from './pages/mesa/mesaedit';
import Principal from './pages/principal/';
import Fila from './pages/fila/index';


import Vendedor from './pages/vendedor/index';
import vendedorcreate from './pages/vendedor/create';
import vendedorshow from './pages/vendedor/show';

import usuario from './pages/usuario/index';
import usuariocreate from './pages/usuario/create';
import usuarioshow from './pages/usuario/show';

import auditoria from './pages/auditoria/index';

import login from './pages/login/login';

import PrivateRoute from './pages/services/privateroute';


ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
      <Switch>
            <PrivateRoute path="/" exact={true} component={Principal} />
            <PrivateRoute path="/mesa" exact={true} component={Mesa} />
            <PrivateRoute path="/mesa/create" component={MesaCreate} />
            <PrivateRoute path="/mesa/show/:id" component={MesaEdit} />

            <PrivateRoute path="/fila" component={Fila} />

            <PrivateRoute path="/vendedor" exact={true} component={Vendedor} />
            <PrivateRoute path="/vendedor/create" component={vendedorcreate} />
            <PrivateRoute path="/vendedor/show/:id" component={vendedorshow} />
            


            <PrivateRoute path="/usuario" exact={true} component={usuario} />
            <PrivateRoute path="/usuario/create" component={usuariocreate} />
            <PrivateRoute path="/usuario/show/:id" component={usuarioshow} />

            <PrivateRoute path="/auditoria" component={auditoria} />


            <Route path="/login" exact={true} component={login} />

            
        </Switch>
  
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

