import React from 'react';


import {
    Container
} from 'reactstrap';


import { MenuPrincipal } from '../principal/menu/menu'


export default function Principal() {


    return (
        
         <Container className="content">
             {/* <div className="App"> */}
              
                    <MenuPrincipal />                    
              
             {/* </div> */}
         </Container>


    )


}