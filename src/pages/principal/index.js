import React  from 'react';
import {  Switch, Route } from 'react-router-dom'

import {
    Container
  } from 'reactstrap';


import { MenuPrincipal } from '../principal/menu/menu'

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
        <Container  className="content">
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