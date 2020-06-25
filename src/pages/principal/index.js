import React from 'react';
import { Switch, Route } from 'react-router-dom'

import {
    Container
} from 'reactstrap';


import { MenuPrincipal } from '../principal/menu/menu'


export default function Principal() {


    return (
        <Container className="content">
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