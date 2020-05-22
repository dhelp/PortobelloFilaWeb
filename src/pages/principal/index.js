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


            {/* <Route path="/" exact={true}  /> */}

            <Route path="/fila" exact={true} component={Fila} />

            <Route path="/mesa" exact={true} component={Mesa} />
            <Route path="/mesa/create" component={MesaCreate} />
            <Route path="/mesa/show/:id" component={MesaEdit} />


            
            </Switch>
            
            </Route>
            </div>
        
        </Container>
        
        
    )


}