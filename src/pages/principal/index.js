import React from 'react';
import { Link } from 'react-router-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import {MenuPrincipal} from '../principal/menu/menu'

import Mesa from '../mesa/index';
import MesaCreate from '../mesa/mesacreate';
import MesaEdit from '../mesa/mesaedit';


import Fila from '../fila/index';




import Container from 'react-bootstrap/Container';

export default function Principal() {


    return (
        <Container fluid>
        <div className="App">
            <Route>
                
                <MenuPrincipal />
            <Switch>    


            
            </Switch>
            
            </Route>
            </div>
        
        </Container>
        
        
    )


}