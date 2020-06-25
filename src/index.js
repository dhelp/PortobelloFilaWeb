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


ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
      <Switch>
            <Route path="/" exact={true} component={Principal} />
            <Route path="/mesa" exact={true} component={Mesa} />
            <Route path="/mesa/create" component={MesaCreate} />
            <Route path="/mesa/show/:id" component={MesaEdit} />

            <Route path="/fila" component={Fila} />

            


            <Route path="/vendedor" exact={true} component={Vendedor} />
            <Route path="/vendedor/create" component={vendedorcreate} />
            <Route path="/vendedor/show/:id" component={vendedorshow} />
            


            <Route path="/usuario" exact={true} component={usuario} />
            <Route path="/usuario/create" component={usuariocreate} />
            <Route path="/usuario/show/:id" component={usuarioshow} />

            <Route path="/auditoria" component={auditoria} />

            
        </Switch>
  
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

