import React from 'react';
import { isTokenExpired } from "../services/auth"; 
import { useHistory } from 'react-router-dom'

import {
    Container
} from 'reactstrap';


import { MenuPrincipal } from '../principal/menu/menu'


export default function Principal() {

    const history = useHistory();
    
    const logged = isTokenExpired();
    if(logged===false){
      history.push('/login')
    }

    return (
        
         <Container className="content">
             {/* <div className="App"> */}
              
                    <MenuPrincipal />                    
              
             {/* </div> */}
         </Container>


    )


}