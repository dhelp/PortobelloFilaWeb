import React,{useState} from 'react';
import { Link } from 'react-router-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import io from 'socket.io-client';

import { MenuPrincipal } from '../principal/menu/menu'

import Mesa from '../mesa/index';
import MesaCreate from '../mesa/mesacreate';
import MesaEdit from '../mesa/mesaedit';


import Fila from '../fila/index';




import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function Principal() {

    const [msg, setMsg] = useState('não clicado');

    const socket = io.connect('https://app-server-fila-gabriel.herokuapp.com/');
    socket.on('join', receiveinfo =>{
            setMsg(receiveinfo);

            setTimeout(() => {
                setMsg('não clicado')
            }, 5000);
    });


    function teste() {

        const socket = io.connect('https://app-server-fila-gabriel.herokuapp.com/');
        socket.on('connect', function (data) {
            socket.emit('join', 'Hello World from client');          
        });
    }

    return (
        <Container fluid>
            <div className="App">
                <Route>

                    <MenuPrincipal />
                    {/* <Button onClick={() => teste()}>{msg}</Button> */}
                    <Switch>



                    </Switch>

                </Route>
            </div>

        </Container>


    )


}