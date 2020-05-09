import React from 'react';
import { BrowserRouter , Route, Switch} from 'react-router-dom';


import Mesa from './pages/mesa'




export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                
                <Route path='/mesa' exact component={Mesa} />
          
                
            </Switch>
        </BrowserRouter>
    )
}