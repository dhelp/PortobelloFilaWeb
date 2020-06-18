import React  from 'react';
// import { Link } from 'react-router-dom'
import {  Switch, Route } from 'react-router-dom'
//import io from 'socket.io-client';

//import {socket} from '../../service/socket.js';

import { MenuPrincipal } from '../principal/menu/menu'

// import Mesa from '../mesa/index';
// import MesaCreate from '../mesa/mesacreate';
// import MesaEdit from '../mesa/mesaedit';


// import Fila from '../fila/index';




import Container from 'react-bootstrap/Container';
//import Button from 'react-bootstrap/Button';

export default function Principal() {




   // const [msg, setMsg] = useState('não clicado');

    // const sendSocketServer = useCallback(
    //     () => {
    //         //const socket = io.connect('http://localhost:3000');
    //         socket.emit('join', 'Hello World from client');

    //         socket.on('join', receiveinfo => {
    //             setMsg(receiveinfo);
        
    //             // setTimeout(() => {
    //             //     setMsg('não clicado')
    //             // }, 5000);
    //         })
    //     },
    //     [],
    // )


    //          //const socket = io.connect('http://localhost:3000');
    // socket.on('join', receiveinfo => {
    //     setMsg(receiveinfo);

    //     setTimeout(() => {
    //         setMsg('não clicado')
    //     }, 5000);
    // });

   


    // function sendSocketServer() {
    //     const socket = io.connect('http://localhost:3000');
    //     socket.emit('join', 'Hello World from client');
    // }

    return (
        <Container fluid>
            <div className="App">
                <Route>

                    <MenuPrincipal />
                    {/* <Button onClick={sendSocketServer}>{msg}</Button> */}
                    <Switch>



                    </Switch>

                </Route>
            </div>

        </Container>


    )


}