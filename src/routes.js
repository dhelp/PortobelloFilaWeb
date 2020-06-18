import React from 'react';
import { BrowserRouter , Route, Switch} from 'react-router-dom';


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


import auditoria from './pages/auditoria/index';



export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>


                <Route path="/fila" exact={true}  component={Fila} />
                <Route path='/mesa' exact component={Mesa} />
                <Route path='/mesa/create'  component={MesaCreate} />          
                <Route path='/mesa/show'  component={MesaEdit} />

                <Route path='/vendedor' exact={true} component={vendedor} />
                <Route path='/vendedor/create'  component={vendedorcreate} />
                <Route path='/vendedor/show'  component={vendedorshow} />
                

                <Route path='/usuario' exact={true}  component={usuario} />
                <Route path='/usuario/create'  component={usuariocreate} />
                <Route path='/usuario/show'  component={usuarioshow} />

                <Route path='/auditoria'  component={auditoria} />

                

            
                

          
                
            </Switch>
        </BrowserRouter>
    )
}