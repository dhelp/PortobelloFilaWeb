import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import {
    Container
} from 'reactstrap';


import { MenuPrincipal } from '../principal/menu/menu'



export default function Principal() {


    // class MyErrorBoundary extends Component {
    //     state = {
    //         errorMessage: ''
    //     }
    //     static getDerivedStateFromError(error) {
    //         return { errorMessage: error.toString() }
    //     }
    //     componentDidCatch(error, info) {
    //         this.logErrorToServices(error.toString(), info.componentStack)
    //     }
    //     // A fake logging service 😬
    //     logErrorToServices = console.log
    //     render() {
    //         if (this.state.errorMessage) {
    //             return (
    //                 <p>
    //                     {this.state.errorMessage}
    //                 </p>
    //             )
    //         }
    //         return this.props.children
    //     }
    // }

    // class BuggyCounter extends Component {
    //     // nothing was modified :P
    // }

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
        <Container className="content">
            <div className="App">
                {/* <MyErrorBoundary>
                    <BuggyCounter />
                </MyErrorBoundary> */}
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