import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'


import { getToken, logout } from "../../services/auth"; 

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
  Button
} from 'reactstrap';


export const MenuPrincipal = (props) => {

  const history = useHistory();

  function logof(){
    logout();
    history.push('/');

  }

  const user = localStorage.getItem('app-user');
  
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    
    <div >
    <Navbar color="light"  light expand="md" >
      <NavbarBrand href="/">Fila Gabriel</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" >
          <NavItem>
          <Link to='fila' className='nav-link'>Fila</Link>
          </NavItem>
          <NavItem>
          <Link to='vendedor' className='nav-link'>Vendedor(a)</Link>            
          </NavItem>
          <NavItem>
            <Link to='mesa' className='nav-link'>Mesa</Link>
            </NavItem>
            <NavItem>
            <Link to='auditoria' className='nav-link'>Auditoria</Link>
            </NavItem>
            <NavItem>
            <Link to='usuario' className='nav-link'>Usuários</Link>
            </NavItem>
          
        </Nav>
        <NavbarText style={{'display': 'grid'}}><p style={{'fontSize': '15px', 'color': '#000000', 'fontWeight': 'bold','font-family': 'Arial, Helvetica, sans-serif','text-transform': 'uppercase'}}>{user}</p> <Button style={{maxWidth:'50px'}} outline  color="primary" size="sm" onClick={()=>logof()}>Logoff</Button></NavbarText>
      </Collapse>
    </Navbar>
  </div>
  )
}