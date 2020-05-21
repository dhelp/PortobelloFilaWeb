import React from 'react';
import { BrowserRouter , Route, Switch} from 'react-router-dom';


import Mesa from './pages/mesa/index'
import MesaEdit from './pages/mesa/mesaedit'
import MesaCreate from './pages/mesa/mesacreate'





export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                
                <Route path='/mesa' exact component={Mesa} />
                <Route path='/mesa/create'  component={MesaCreate} />          
                <Route path='/mesa/show'  component={MesaEdit} />

            


          
                
            </Switch>
        </BrowserRouter>
    )
}