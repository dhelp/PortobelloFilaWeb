import React from 'react';
import { useParams } from "react-router";
import { BrowserRouter , Route, Switch} from 'react-router-dom';

import index from './pages/principal/index'

import Mesa from './pages/mesa/index'
import MesaEdit from './pages/mesa/mesaedit'
import MesaCreate from './pages/mesa/mesacreate'


import vendedor from './pages/vendedor/index'
import vendedorcreate from './pages/vendedor/create'
import vendedorshow from './pages/vendedor/show'

import usuario from './pages/usuario/index'
import usuariocreate from './pages/usuario/create'
import usuarioshow from './pages/usuario/show'

import Fila from './pages/fila/index';

 import login from './pages/login/login';


import auditoria from './pages/auditoria/index';

import PrivateRoute from './pages/services/privateroute';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
            <Route path='/login'   component={login} />
            <PrivateRoute path="/" exact={true}  component={index} />
            
                <PrivateRoute path="/fila" exact={true}  component={Fila} /> */}

                 <PrivateRoute path='/mesa' exact component={Mesa} />
                 <PrivateRoute path='/mesa/create'  component={MesaCreate} />          
                 <PrivateRoute path='/mesa/show/:id'  component={MesaEdit} />

                <PrivateRoute path='/vendedor' exact={true} component={vendedor} />
                <PrivateRoute path='/vendedor/create'  component={vendedorcreate} />
                <PrivateRoute path='/vendedor/show/:id'  component={vendedorshow} />
                

                <PrivateRoute path='/usuario' exact  component={usuario} />
                <PrivateRoute path='/usuario/create'  component={usuariocreate} />
                <PrivateRoute path='/usuario/show/:id'  component={usuarioshow} />

                

                <PrivateRoute path='/auditoria'  component={auditoria} />
                
            </Switch>
        </BrowserRouter>
    )
}