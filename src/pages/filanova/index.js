import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
//import io from 'socket.io-client';


import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReplayIcon from '@material-ui/icons/Replay';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
// import EditIcon from '@material-ui/icons/Edit';
// import CachedIcon from '@material-ui/icons/Cached';
import { green, blue, red, yellow } from '@material-ui/core/colors';



//import { socket } from '../../service/socket.js';


import {
  Container, Row, Button,  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input
} from 'reactstrap';


import api from '../services/api';



import './stylefila.css';





export default function Index() {

  const [listaFilaVendedor, setListaFilaVendedor] = useState([]);
  const [listaSelectVendedor, setListaSelectVendedor] = useState([]);
  const [listaSelectMesa, setListaSelectMesa] = useState([]);
  const [vendedor_id, setVendedor_id] = useState(0);
  const [mesa_id, setMesa_id] = useState(0);
  const [msgInfo, setMsgInfo] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalConfDel, setModalConfDel] = useState(false);
  const [modalConfTel, setModalConfTel] = useState(false);
  const [modalConfAt, setModalConfAt] = useState(false);
  const [modalConfDi, setModalConfDi] = useState(false);
  const [modalConfDelNome, setModalConfDelNome] = useState(false);
  const [modalTipoAtendimento, setModalTipoAtendimento] = useState(false);
  const [modalConfDelId, setModalConfDelId] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  //const [n, setN] = useState([]);



  function formataHora(dt) {
    var today = new Date(Date.parse(dt.replace(/\s/, 'T') + 'Z'));

    var time = today.getHours().toString().padStart(2, '0') + ":" + today.getMinutes().toString().padStart(2, '0')
    return time;
  }




  async function insereFila(e) {
    e.preventDefault();
    const data = { vendedor_id, mesa_id };



    if (vendedor_id === 0) {
      setMsgInfo('Selecione um(a) vendedor(a)');
      toggleInfo()
    } else if (mesa_id === 0) {
      setMsgInfo('Selecione uma mesa.');
      toggleInfo()
    }
    else {

      //console.log(vendedor_id);

      setModal(!modal);

      const res = await api.post('fila/create', data);

      if (res.status === 201) {
        review();
        setVendedor_id(0);
        setMesa_id(0);

      } else if (res.status === 200) {
        alert(res.data.error);
      }
    }
  }



  //DELETA VENDEDOR FILA
  async function deletaFila(e) {

    const id = e;

    const res = await api.delete(`fila/delete/${id}`);

    //console.log(res)

    if (res.status === 204) {
      toggleDelOff()
      //setModalConfDel(!modalConfDel)
      review();
      //console.log(res.status);
    } else if (res.status === 200) {
      alert(res.data.error);
    } else {

      toggleDelOff()
      setModalConfDel(!modalConfDel)
      setMsgInfo(res.data.error);
      toggleInfo()

    }
  }


  async function ocupadoTelefone(e) {

    const id = e;

    const res = await api.put(`fila/ocupadotelefone/${id}`);

    if (res.status === 204) {

      review();
      setModalConfTel(!modalConfTel)
      //console.log(res.status);

    } else if (res.status === 200) {
      alert(res.data.error);
    } else {

      //toggleTel()
      setModalConfTel(!modalConfTel)
      //console.log(res);
      setMsgInfo(res.data.error);
      toggleInfo()
      //alert(res.data.error);
    }
  }


  async function atendimento(e) {

    const id = e;

    const res = await api.put(`fila/atendimento/${id}`);

    if (res.status === 204) {

      review();
      setModalConfAt(!modalConfAt)
      //console.log(res.status);

    } else if (res.status === 200) {
      alert(res.data.error);
    }
  }


  async function disponivel(e) {

    const id = e;

    const data = e.nome;

    //console.log(data);

    const res = await api.put(`fila/disponivel/${id}`, data);

    if (res.status === 204) {

      review();
      // console.log(res.status);
      setModalConfDi(false)

    } else if (res.status === 200) {
      alert(res.data.error);
    }
  }

  //   const review =  useCallback(
  //   () => {
  //      api.get('fila').then(
  //       response => {
  //         setListaFilaVendedor(response.data)

  //       }
  //     )

  //     aa();
  //   },
  //   [],
  // )
  async function review() {
    await api.get('fila').then(
      response => {
        setListaFilaVendedor(response.data)

      }
    )

    aa();

  }

  //const socket = io.connect('http://localhost:3000');
  // socket.on('join2', receiveinfo => {
  //   setN(receiveinfo);
  //   //console.log(receiveinfo);
  // });


  useEffect(() => {
    api.get('fila').then(
      response => {
        setListaFilaVendedor(response.data)

      }
    )
  }, [])

  const aa = () => {

    // //const socket = io.connect('http://localhost:3000');
    // socket.emit('join2', 'Hello World from Fila2');
    // // socket.on('connect', function (data) {

    // }
    // );

  }




  const toggleInfo = () => setModalInfo(!modalInfo);

  const togleModalOff = () => {
    setModal(!modal);
  }

  const toggle = async (e) => {
    //.preventDefault();

    setVendedor_id(0);
    setMesa_id(0);

    await api.get('listamesafila').then(
      response => {
        setListaSelectMesa(response.data)

      }
    )

    await api.get('listavendedorfila').then(
      response => {
        setListaSelectVendedor(response.data)

      }
    )
    setModal(!modal);

  }

  const toggleDelOff = () => {
    setModalConfDel(!modalConfDel)
  }

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

  const setAtendimento = (e) => {

    if (e.id_status === 2) {
      setMsgInfo(`O(a) vendedor(a) '${e.nome}' já está em atendimento.`);
      toggleInfo()

    } else if (e.id_status === 3) {
      setMsgInfo('Ação não permitida. Deixe o(a) vendedor(a) ' + e.nome + ' disponível primeiro.');
      toggleInfo()
    }
    else {

      toggleAt(e)

    }
  }

  const setTelefone = (e) => {

    if (e.id_status === 3) {
      setMsgInfo(`O(a) vendedor(a) '${e.nome}' já está ao telefone.`);
      toggleInfo()

    } else if (e.id_status === 2) {
      setMsgInfo(`Ação não permitida. \n Deixe o(a) vendedor(a) '${e.nome}' disponível primeiro.`);
      toggleInfo()
    } else {

      toggleTel(e)

    }
  }

  const setDisponivel = (e) => {

    if (e.id_status === 1) {
      setMsgInfo(`O(a) vendedor(a) '${e.nome}' já está disponível.`);
      toggleInfo()
    } else if (e.id_status === 3) {

      toggleDi(e)
    }


    else {

      setModalTipoAtendimento(!modalTipoAtendimento)
      setModalConfDelId(e.id);


      //toggleDi(e)
    }
  }

  const setSairDaFila = (e) => {

    if (e.id_status === 2) {
      setMsgInfo(`Ação não permitida. O(a) vendedor(a) '${e.nome}' já está em atendimento.`);
      toggleInfo()
    } else {

      toggleDel(e)

    }
  }




  const toggleTipoAtendimento = (e) => {

    //console.log(modalConfDelId);


    disponivel(modalConfDelId);

    setModalTipoAtendimento(!modalTipoAtendimento)


    // setModalConfDelNome(e.nome);
    //setModalConfDelId(e.id);


  }

  const toggleAt = (e) => {
    setModalConfAt(!modalConfAt)
    setModalConfDelNome(e.nome);
    setModalConfDelId(e.id);
  }

  const toggleDi = (e) => {
    //setModalTipoAtendimento(!modalTipoAtendimento)
    setModalConfDi(!modalConfDi)
    setModalConfDelNome(e.nome);
    setModalConfDelId(e.id);
  }









  return (

    <Container className="content">

 
      {/* <Row> */}
      {/* class="table-responsive" */}
        {/* <div  > */}
          {/* <Button onClick={() => aa()}>clique aqui {n}</Button> */}
          <table className="ui celled striped blue table">
            <thead>

              <tr>
                <th>STATUS</th>
                <th>HORA</th>
                <th>VENDEDOR(A)</th>
                <th>RAMAL</th>
                <th>AÇÃO</th>

              </tr>
            </thead>
            <tbody>

              {listaFilaVendedor.map(fila => (
                <tr key={fila.id}>
                  <th >

                    {fila.id_status === 1 ? <Brightness1Icon style={{ color: green[500], fontSize: 25 }} /> :
                      fila.id_status === 2 ? <RecordVoiceOverIcon style={{ color: blue[500], fontSize: 25 }} /> :
                        fila.id_status === 3 ? <PhoneInTalkIcon style={{ color: '#FFC107', fontSize: 25 }} /> :
                          fila.id_status === 4 ? <HighlightOffIcon style={{ color: blue[500], fontSize: 25 }} /> :
                            ''}
                    {' '}
                    {fila.status}</th>
                  <td>{formataHora(fila.data_entrada)}</td>
                  <td>{fila.nome_vendedor}</td>
                  <td>{fila.ramal}</td>
                  <td >
                    {/* <div id="mmacao"> */}
                     <Button  outline size="sm" onClick={(e) => setDisponivel({ nome: fila.nome_vendedor, id: fila.id, id_status: fila.id_status })}><Brightness1Icon style={{ color: green[500], fontSize: 25}} /></Button>
                       <Button outline size="sm" onClick={(e) => setAtendimento({ nome: fila.nome_vendedor, id: fila.id, id_status: fila.id_status })}><RecordVoiceOverIcon style={{ color: blue[500], fontSize: 25 }} /></Button>
                      <Button outline size="sm" onClick={(e) => setTelefone({ nome: fila.nome_vendedor, id: fila.id, id_status: fila.id_status })}><PhoneInTalkIcon style={{ color: '#FFC107', fontSize: 25 }} /></Button>

                      <Button id="inserefila" value={fila.id} outline size="sm" onClick={(e) => setSairDaFila({ nome: fila.nome_vendedor, id: fila.id, id_status: fila.id_status })}> <span><HighlightOffIcon style={{ color: red[500], fontSize: 25 }} /></span></Button>
                    {/* </div> */}
                  </td>

                </tr>


              ))}


            </tbody>
            <tfoot>
              <tr >

                <th colSpan="5">

                  <Button outline color="success" onClick={(e) => toggle()}><span><AddCircleOutlineIcon style={{ color: green[500] }}
                    fontSize="large" /></span> ADICIONAR VENDEDOR(A)</Button>
                </th>
              </tr>
            </tfoot>
          </table>
        {/* </div> */}


      {/* </Row> */}
      <Row>
        <Link to="/"><Button color="primary">VOLTAR</Button></Link>

      </Row>

      <Modal isOpen={modal} fade={false} toggle={togleModalOff} >
        <ModalHeader toggle={togleModalOff}>ADICIONAR VENDEDOR(A) NA FILA</ModalHeader>
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
          <Button color="danger" onClick={togleModalOff}>CANCELAR</Button>
        </ModalFooter>
      </Modal>



      <Modal isOpen={modalConfDel} fade={false} toggle={toggleDelOff} >
        <ModalHeader toggle={toggleDelOff}>Confirmação</ModalHeader>
        <ModalBody>
          Deseja retirar a vendedor(a) <strong>{modalConfDelNome}</strong> da fila?
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={(e) => deletaFila(modalConfDelId)}>SIM</Button>{' '}
          <Button color="secondary" onClick={toggleDelOff}>NÃO</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalConfTel} fade={false} toggle={toggleTel} >
        <ModalHeader toggle={toggleTel}><PhoneInTalkIcon style={{ color: '#FFC107', fontSize: 25 }} /> Confirmação</ModalHeader>
        <ModalBody>
          Deseja alterar o status do(a) vendedor(a) <strong>{modalConfDelNome}</strong> para 'Telefone'?
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => ocupadoTelefone(modalConfDelId)}>SIM</Button>{' '}
          <Button color="secondary" onClick={toggleTel}>NÃO</Button>
        </ModalFooter>
      </Modal>



      <Modal isOpen={modalConfAt} fade={false} toggle={toggleAt} >
        <ModalHeader toggle={toggleAt}><RecordVoiceOverIcon style={{ color: blue[500], fontSize: 25 }} /> Confirmação</ModalHeader>
        <ModalBody>
          Deseja alterar o status do(a) vendedor(a) <strong>{modalConfDelNome}</strong> para 'atendimento'?
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => atendimento(modalConfDelId)}>SIM</Button>{' '}
          <Button color="secondary" onClick={toggleAt}>NÃO</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalConfDi} fade={false} toggle={toggleDi} >
        <ModalHeader toggle={toggleDi}><Brightness1Icon style={{ color: green[500], fontSize: 25 }} /> Confirmação</ModalHeader>
        <ModalBody>
          Deseja alterar o status do(a) vendedor(a) <strong>{modalConfDelNome}</strong> para <strong>'disponivel'</strong>?
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => disponivel(modalConfDelId)}>SIM</Button>{' '}
          <Button color="secondary" onClick={toggleDi}>NÃO</Button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalInfo} fade={false} toggle={toggleInfo} >
        <ModalHeader className='hedinfo' toggle={toggleInfo}>ALERTA</ModalHeader>
        <ModalBody>
          {msgInfo}
        </ModalBody>
        <ModalFooter>

          <Button color="danger" onClick={toggleInfo}>FECHAR</Button>
        </ModalFooter>
      </Modal>

      <Modal  isOpen={modalTipoAtendimento} fade={false} >
        <ModalHeader  >< ContactPhoneIcon style={{ color: blue[500], fontSize: 45 }} /> Informe o tipo de atendimento:</ModalHeader>
        <ModalBody>
          <div id='divmodalsetretorno'>
            <Button outline color="primary" onClick={() => toggleTipoAtendimento({ id_retorno: 1 })}><span><ThumbUpIcon style={{ color: blue[700], fontSize: 35 }} /></span>  ATENDIMENTO</Button>
            <Button outline color="warning" onClick={() => toggleTipoAtendimento({ id_retorno: 2 })} ><span><ReplayIcon style={{ color: yellow[900], fontSize: 35 }} /></span>RETORNO DE ORÇAMENTO</Button>
          </div>
        </ModalBody>

      </Modal>


    </Container>





  )




}
