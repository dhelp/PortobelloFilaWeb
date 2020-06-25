import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';


export const MenuPrincipal = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    
    <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Fila Gabriel</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
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
       
      </Collapse>
    </Navbar>
  </div>
  )
}