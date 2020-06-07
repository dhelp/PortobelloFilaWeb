import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Time from 'react-time-format'

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import { green, blue } from '@material-ui/core/colors';

import { Container, Row, Col, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter ,
  Form, FormGroup, Label, Input, FormText } from 'reactstrap';




import api from '../services/api';



import './stylefila.css';

import 'bootstrap/dist/css/bootstrap.css';





export default function Index() {

  const [listaFilaVendedor, setListaFilaVendedor] = useState([]);

  const [open, setOpen] = useState(false);

  const [vendedor, setVendedor] = useState({
    age: '',
    name: 'hai',
  });





  const [mesa, setMesa] = useState({
    mesa: '',
    name: '155',
  });

  const handleChangeVendedor = (event) => {
    setVendedor(event.target.value);
  };

  const handleChangeMesa = (event) => {
    setMesa(event.target.value);
  };

  function handleClickOpen() {
    setOpen(true);
  };


  function handleClose() {
    setOpen(false);
  };


  useEffect(() => {
    api.get('fila').then(
      response => {
        setListaFilaVendedor(response.data)
        console.log(response)
      }
    )
  }, [])


  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);






  return (
    <Container className="content">
      <Row>

        <div class="table-responsive">
          <Table bordered >
            <thead>

              <tr>
                <th>STATUS</th>
                <th scope="col">HORA</th>
                <th>VENDEDOR(A)</th>
                <th>RAMAL</th>
                <th>AÇÃO</th>

              </tr>
            </thead>
            <tbody>

              {listaFilaVendedor.map(fila => (
                <tr key={fila.id}>
                  <th scope="row">{fila.status}</th>
                  <td><Time value={fila.data_entrada} format="HH:mm" /></td>
                  <td>{fila.nome_vendedor}</td>
                  <td>{fila.ramal}</td>
                  <td><Brightness1Icon style={{ color: green[500], fontSize: 30 }}

                  />

                    <PhoneInTalkIcon style={{ color: blue[500], fontSize: 30 }} />

                  </td>

                </tr>


              ))}


            </tbody>
            <tfoot>
              <tr >

                <td colspan="5">

                  <Button color="link" onClick={toggle}><AddCircleOutlineIcon style={{ color: green[500] }}
                    fontSize="large" /> ADICIONAR VENDEDOR(A)</Button>
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>


      </Row>
      <Row>
        <Link to="/"><Button color="primary">VOLTAR</Button></Link>

      </Row>

      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>ADICIONAR VENDEDOR(A) NA FILA</ModalHeader>
        <ModalBody>
        <Form>
     
      <FormGroup>
        <Label for="exampleSelect">Vendendor</Label>
        <Input type="select" name="select" id="exampleSelect">
        <option></option>
          <option>Augusto</option>
          <option>Cesar</option>
          <option>Leticia</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="exampleSelect">Mesa</Label>
        <Input type="select" name="select" id="exampleSelect">
        <option></option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
     
    </Form>
          </ModalBody>
        <ModalFooter>
          <Button color="success"  onClick={toggle}>SALVAR</Button>
          <Button color="danger" onClick={toggle}>CANCELAR</Button>
        </ModalFooter>
      </Modal>

    </Container>





  )




}
