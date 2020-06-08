import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Time from 'react-time-format'

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { green, blue, red } from '@material-ui/core/colors';

import { Container, Row, Col, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter ,
  Form, FormGroup, Label, Input, FormText } from 'reactstrap';




import api from '../services/api';



import './stylefila.css';

import 'bootstrap/dist/css/bootstrap.css';





export default function Index() {

  const [listaFilaVendedor, setListaFilaVendedor] = useState([]);


  const [listaSelectVendedor, setListaSelectVendedor] = useState([]);

  const [listaSelectMesa, setListaSelectMesa] = useState([]);

  const [vendedor_id, setVendedor_id] = useState(0);
  const [mesa_id, setMesa_id] = useState(0);

 async function insereFila(e) {
    e.preventDefault();
    const data = { vendedor_id, mesa_id };

    //console.log(data);

    setModal(!modal);

    const res = await api.post('fila/create', data);

     if (res.status === 201) {
      review();
      console.log(res.status);

      
    //     setMesa('');
    //     setRamal('');
    //     history.push('/mesa') 


  } else if (res.status === 200) {
         alert(res.data.error);
     }
}



//DELETA VENDEDOR FILA
async function deletaFila(e) {

  const id = e;

  const res = await api.delete(`fila/delete/${id}`);

   if (res.status === 204) {

    review();
    console.log(res.status);



  

} else if (res.status === 200) {
       alert(res.data.error);
   }
}


  async function review(){
   await api.get('fila').then(
      response => {
        setListaFilaVendedor(response.data)
       
      }
    )
  }

  useEffect(() => {
    api.get('fila').then(
      response => {
        setListaFilaVendedor(response.data)
       
      }
    )
  }, [])

  useEffect(() => {
    api.get('listavendedorfila').then(
      response => {
        setListaSelectVendedor(response.data)
 
      }
    )
  }, [])

  useEffect(() => {
    api.get('listamesafila').then(
      response => {
        setListaSelectMesa(response.data)
    
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
                    <RecordVoiceOverIcon style={{ color: blue[500], fontSize: 30 }}  />
                    <PhoneInTalkIcon style={{ color: blue[500], fontSize: 30 }} />

                    <Button value={fila.id}  outline  size="sm" onClick={() => deletaFila(fila.id)}> <span><HighlightOffIcon style={{ color: red[500], fontSize: 25 }} /></span></Button>

                  </td>

                </tr>


              ))}


            </tbody>
            <tfoot>
              <tr >

                <td colspan="5">

                  <Button outline color="success"  onClick={toggle}><span><AddCircleOutlineIcon style={{ color: green[500] }}
                    fontSize="large" /></span> ADICIONAR VENDEDOR(A)</Button>
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
        <Label for="selectVendedor">Vendendor</Label>
        <Input type="select" name="selectVendedor" id="selectVendedor" onChange={e => setVendedor_id(e.target.value)}>
          <option></option>
        {listaSelectVendedor.map(list => 
          <option value={list.id}>{list.nome_vendedor}</option>

        )
}
          
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="selectMesa">Mesa</Label>
        <Input type="select" name="selectMesa" id="selectMesa" onChange={e => setMesa_id(e.target.value)}>
        <option></option>
        {listaSelectMesa.map(list => 
          <option value={list.id}>{list.mesa}</option>

        )
}
        </Input>
      </FormGroup>
     
    </Form>
          </ModalBody>
        <ModalFooter>
          <Button color="success"  onClick={insereFila}>SALVAR</Button>
          <Button color="danger" onClick={toggle}>CANCELAR</Button>
        </ModalFooter>
      </Modal>

    </Container>





  )




}
