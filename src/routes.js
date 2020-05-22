import React from 'react';
import { BrowserRouter , Route, Switch} from 'react-router-dom';


import Mesa from './pages/mesa/index'
import MesaEdit from './pages/mesa/mesaedit'
import MesaCreate from './pages/mesa/mesacreate'



import Fila from './pages/fila/index';



export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>


                <Route path="/fila" exact={true}  component={Fila} />
                <Route path='/mesa' exact component={Mesa} />
                <Route path='/mesa/create'  component={MesaCreate} />          
                <Route path='/mesa/show'  component={MesaEdit} />

            
                

          
                
            </Switch>
        </BrowserRouter>
    )
}