import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import Time from 'react-time-format'
import Moment from 'moment'

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { green, blue, red } from '@material-ui/core/colors';

import {
  Container, Row, Col, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, FormText
} from 'reactstrap';




import api from '../services/api';



import './stylefila.css';

import 'bootstrap/dist/css/bootstrap.css';





export default function Index() {

  const [listaFilaVendedor, setListaFilaVendedor] = useState([]);
  const [listaSelectVendedor, setListaSelectVendedor] = useState([]);
  const [listaSelectMesa, setListaSelectMesa] = useState([]);
  const [vendedor_id, setVendedor_id] = useState(0);
  const [mesa_id, setMesa_id] = useState(0);



  function formataHora(dt) {
    var today = new Date(Date.parse(dt.replace(/\s/, 'T') + 'Z'));

    var time = today.getHours().toString().padStart(2, '0') + ":" + today.getMinutes().toString().padStart(2, '0')
    return time;
  }




  async function insereFila(e) {
    e.preventDefault();
    const data = { vendedor_id, mesa_id };

    //console.log(data);

    setModal(!modal);

    const res = await api.post('fila/create', data);

    if (res.status === 201) {
      review();
      console.log(res.status);

    } else if (res.status === 200) {
      alert(res.data.error);
    }
  }



  //DELETA VENDEDOR FILA
  async function deletaFila(e) {

    const id = e;

    const res = await api.delete(`fila/delete/${id}`);

    if (res.status === 204) {
      setModalConfDel(!modalConfDel)
      review();
      console.log(res.status);
    } else if (res.status === 200) {
      alert(res.data.error);
    }
  }


  async function ocupadoTelefone(e) {

    const id = e;

    const res = await api.put(`fila/ocupadotelefone/${id}`);

    if (res.status === 204) {

      review();
      setModalConfTel(!modalConfTel)
      console.log(res.status);

    } else if (res.status === 200) {
      alert(res.data.error);
    }
  }


  async function atendimento(e) {

    const id = e;

    const res = await api.put(`fila/atendimento/${id}`);

    if (res.status === 204) {

      review();
      setModalConfAt(!modalConfAt)
      console.log(res.status);

    } else if (res.status === 200) {
      alert(res.data.error);
    }
  }


  async function disponivel(e) {

    const id = e;

    const res = await api.put(`fila/disponivel/${id}`);

    if (res.status === 204) {

      review();
      console.log(res.status);
      setModalConfDi(!modalConfDi)

    } else if (res.status === 200) {
      alert(res.data.error);
    }
  }


  async function review() {
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
  const [modalConfDel, setModalConfDel] = useState(false);
  const [modalConfTel, setModalConfTel] = useState(false);
  const [modalConfAt, setModalConfAt] = useState(false);
  const [modalConfDi, setModalConfDi] = useState(false);

  const [modalConfDelNome, setModalConfDelNome] = useState(false);
  const [modalConfDelId, setModalConfDelId] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleDel = (e) => {
    setModalConfDel(!modalConfDel)
    setModalConfDelNome(e.nome);
    setModalConfDelId(e.id);
  }

  const toggleTel = (e) => {
    setModalConfTel(!modalConfTel)
    setModalConfDelNome(e.nome);
    setModalConfDelId(e.id);
  }


  const toggleAt = (e) => {
    setModalConfAt(!modalConfAt)
    setModalConfDelNome(e.nome);
    setModalConfDelId(e.id);
  }

  const toggleDi = (e) => {
    setModalConfDi(!modalConfDi)
    setModalConfDelNome(e.nome);
    setModalConfDelId(e.id);
  }

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
                  <th >
                  
                  {fila.id_status === 1 ? <Brightness1Icon style={{ color: green[500], fontSize: 25 }} />: 
                  fila.id_status === 2 ? <RecordVoiceOverIcon style={{ color: blue[500], fontSize: 25 }} />:
                  fila.id_status === 3 ? <PhoneInTalkIcon style={{ color: '#FFC107', fontSize: 25 }} />:
                  fila.id_status === 4 ? <HighlightOffIcon style={{ color: blue[500], fontSize: 25 }} />:
                  ''} 
                  {' '}
                  {fila.status}</th>
                  <td>{formataHora(fila.data_entrada)}</td>
                  <td>{fila.nome_vendedor}</td>
                  <td>{fila.ramal}</td>
                  <td><Button outline size="sm" onClick={(e) =>toggleDi({nome: fila.nome_vendedor, id:fila.id})}><Brightness1Icon style={{ color: green[500], fontSize: 25 }} /></Button>
                    <Button outline size="sm" onClick={(e) =>toggleAt({nome: fila.nome_vendedor, id:fila.id})}><RecordVoiceOverIcon style={{ color: blue[500], fontSize: 25 }} /></Button>
                    <Button outline size="sm" onClick={(e) =>toggleTel({nome: fila.nome_vendedor, id:fila.id})}><PhoneInTalkIcon style={{ color: '#FFC107', fontSize: 25 }} /></Button>

                    <Button value={fila.id} outline size="sm" onClick={(e) =>toggleDel({nome: fila.nome_vendedor, id:fila.id})}> <span><HighlightOffIcon style={{ color: red[500], fontSize: 25 }} /></span></Button>

                  </td>

                </tr>


              ))}


            </tbody>
            <tfoot>
              <tr >

                <td colspan="5">

                  <Button outline color="success" onClick={toggle}><span><AddCircleOutlineIcon style={{ color: green[500] }}
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

      <Modal isOpen={modal} fade={false} toggle={toggle} >
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
          <Button color="success" onClick={insereFila}>SALVAR</Button>
          <Button color="danger" onClick={toggle}>CANCELAR</Button>
        </ModalFooter>
      </Modal>



      <Modal isOpen={modalConfDel} fade={false} toggle={toggleDel} >
        <ModalHeader toggle={toggleDel}>Confirmação</ModalHeader>
        <ModalBody>
          Deseja retirar a vendedor(a) <strong>{modalConfDelNome}</strong> da fila?
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => deletaFila(modalConfDelId)}>SIM</Button>{' '}
          <Button color="secondary" onClick={toggleDel}>NÃO</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalConfTel} fade={false} toggle={toggleTel} >
        <ModalHeader toggle={toggleTel}>Confirmação</ModalHeader>
        <ModalBody>
          Deseja alterar o status do(a) vendedor(a) <strong>{modalConfDelNome}</strong> para 'Telefone'?
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => ocupadoTelefone(modalConfDelId)}>SIM</Button>{' '}
          <Button color="secondary" onClick={toggleTel}>NÃO</Button>
        </ModalFooter>
      </Modal>


      
      <Modal isOpen={modalConfAt} fade={false} toggle={toggleAt} >
        <ModalHeader toggle={toggleAt}>Confirmação</ModalHeader>
        <ModalBody>
          Deseja alterar o status do(a) vendedor(a) <strong>{modalConfDelNome}</strong> para 'atendimento'?
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => atendimento(modalConfDelId)}>SIM</Button>{' '}
          <Button color="secondary" onClick={toggleAt}>NÃO</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalConfDi} fade={false} toggle={toggleDi} >
        <ModalHeader toggle={toggleDi}>Confirmação</ModalHeader>
        <ModalBody>
          Deseja alterar o status do(a) vendedor(a) <strong>{modalConfDelNome}</strong> para <strong>'disponivel'</strong>?
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => disponivel(modalConfDelId)}>SIM</Button>{' '}
          <Button color="secondary" onClick={toggleDi}>NÃO</Button>
        </ModalFooter>
      </Modal>
    </Container>





  )




}
