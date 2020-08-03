import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
//import io from 'socket.io-client';

import { isTokenExpired, getTokenUser } from "../services/auth"; 


import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReplayIcon from '@material-ui/icons/Replay';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

import DomainIcon from '@material-ui/icons/Domain';
import DomainDisabledIcon from '@material-ui/icons/DomainDisabled';

import { green, blue, red, yellow,purple , orange} from '@material-ui/core/colors';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import AlarmIcon from '@material-ui/icons/Alarm';
import IconButton from '@material-ui/core/IconButton';



import { socket } from '../../service/socket.js';


import {
  Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input
} from 'reactstrap';


import api from '../services/api';



import './stylefila.css';





export default function Index() {



  const history = useHistory();

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
  const [modalArquiteto, setModalArquiteto] = useState(false);
  const [modalConfDelId, setModalConfDelId] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [n, setN] = useState([]);
  const [ttelefone, setTtelefone] = useState(0);
  const [somaatedimento, setSomaAtendimento] = useState(0);
  const [tipoAtendimento, setTipoAtendimento] = useState();
  const [idFila, setIdFila] = useState();

  const [modalAlteraVendedora, setAlteraVendedora] = useState(false);




  const logged = isTokenExpired();
  if(logged===false){
    history.push('/login')
  }

  



  async function insereFila(e) {
    e.preventDefault();

   const userLogged = getTokenUser();

    const data = { vendedor_id, mesa_id , userLogged};



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

      const res = await api.post('fila/create',  data);

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

    const userLogged = getTokenUser();


    const res = await api.delete(`fila/delete/${id}?userLogged=${userLogged}`);

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

    const userLogged = getTokenUser();

    const res = await api.put(`fila/ocupadotelefone/${id}?userLogged=${userLogged}`);

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

    const userLogged = getTokenUser();

    const res = await api.put(`fila/atendimento/${id}?userLogged=${userLogged}`);

    if (res.status === 204) {

      review();
      setModalConfAt(!modalConfAt)
      //console.log(res.status);

    } else if (res.status === 200) {
      alert(res.data.error);
    }
  }


  async function disponivel(e) {

    const id = e.id;
    //1= atendimento
    //2= retorno de orçamento
    console.log('-----id>'+id);
    console.log('-----id_retorno>'+ e.id_retorno)

    const userLogged = getTokenUser()

    const nome = e.nome;
    const id_retorno = e.id_retorno;
    const arquiteto = e.arquiteto;

    console.log(arquiteto)
    const data = {nome, id_retorno, arquiteto};

    //console.log(data);

    const res = await api.put(`fila/disponivel/${id}?userLogged=${userLogged}`, data);

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
    somaTelefone();
    somaAtendimento();
  }


  async function somaTelefone() {
    await api.get('fila/somatelefone').then(
      response => {
        setTtelefone(response.data.totaltelefonedia)

      }
    )

  }


  async function somaAtendimento() {
    await api.get('fila/somaatendimento').then(
      response => {
        setSomaAtendimento(response.data.totalatendimento)

      }
    )

  }



  //const socket = io.connect('http://localhost:3000');
  socket.on('join2', receiveinfo => {
    setN(receiveinfo);
    //console.log(receiveinfo);
  });


  useEffect(() => {
    api.get('fila').then(
      response => {
        setListaFilaVendedor(response.data)

      }
    )
  }, [n])

  useEffect(() => {
    api.get('fila/somatelefone').then(
      response => {
        setTtelefone(response.data.totaltelefonedia)

      }
    )
  }, [n])


  useEffect(() => {
    api.get('fila/somaatendimento').then(
      response => {
        setSomaAtendimento(response.data.totalatendimento)

      }
    )
  }, [n])




  const aa = () => {
    try {


      //const socket = io.connect('http://localhost:3000');
      socket.emit('join2', 'Hello World from Fila2');
      // socket.on('connect', function (data) {
    } catch (error) {
      alert(error);
    }
    // }
    // )

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

    if (e.id_status == 2) {
      setMsgInfo(`O(a) vendedor(a) '${e.nome}' já está em atendimento.`);
      toggleInfo()

    } else if (e.id_status == 3) {
      setMsgInfo('Ação não permitida. Deixe o(a) vendedor(a) ' + e.nome + ' disponível primeiro.');
      toggleInfo()
    }
    else {

      toggleAt(e)

    }
  }

  const setTelefone = (e) => {

    if (e.id_status == 3) {
      setMsgInfo(`O(a) vendedor(a) '${e.nome}' já está ao telefone.`);
      toggleInfo()

    } else if (e.id_status == 2) {
      setMsgInfo(`Ação não permitida. \n Deixe o(a) vendedor(a) '${e.nome}' disponível primeiro.`);
      toggleInfo()
    } else {

      toggleTel(e)

    }
  }

  const setDisponivel = (e) => {

    if (e.id_status == 1) {
      setMsgInfo(`O(a) vendedor(a) '${e.nome}' já está disponível.`);
      toggleInfo()
    } else if (e.id_status == 3) {

      toggleDi(e)
    }


    else {

      setModalTipoAtendimento(!modalTipoAtendimento)
      setModalConfDelId(e.id);


      //toggleDi(e)
    }
  }

  const setSairDaFila = (e) => {

    if (e.id_status == 2) {
      setMsgInfo(`Ação não permitida. O(a) vendedor(a) '${e.nome}' já está em atendimento.`);
      toggleInfo()
    } else {

      toggleDel(e)

    }
  }

  const toggleArquiteto = (e) => {

    console.log(modalConfDelId);
    const arquiteto = e.arquiteto;
    setTipoAtendimento(arquiteto)

//COmentei
    disponivel({id:modalConfDelId, id_retorno:tipoAtendimento, arquiteto});

    //setModalTipoAtendimento(!modalTipoAtendimento)

    setModalArquiteto(false);


    // setModalConfDelNome(e.nome);
    //setModalConfDelId(e.id);


  }


  const toggleTipoAtendimento = (e) => {

    console.log(modalConfDelId);
    const id_retorno = e.id_retorno;
    setTipoAtendimento(id_retorno)

//COmentei
    //disponivel({id:modalConfDelId, id_retorno});

    setModalTipoAtendimento(!modalTipoAtendimento)

    setModalArquiteto(true);


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


  
  const togleAlteraVendedora = async (e) =>  {

    setVendedor_id(0);

    await api.get('listavendedortroca').then(
      response => {
        setListaSelectVendedor(response.data)

      }
    )
    setIdFila(e.id);
    setAlteraVendedora(!modalAlteraVendedora)
    
  }

  async function alteraVendedorAtendimento(e) {

   //e.preventDefault();
    //alert('teste')
    const id = idFila;

    //console.log(vendedor_id);
  
    if(vendedor_id == '0' ){
    setMsgInfo('Selecione um(a) vendedor(a)');
    toggleInfo()
  }else{
    const userLogged = getTokenUser()

    const data = { vendedor_id, id , userLogged};
 

    

    

    const res = await api.put(`fila/atendimentoalteravendedor/${id}?userLogged=${userLogged}`, data);

    if (res.status === 204) {

      review();
      // console.log(res.status);
      //togleAlteraVendedora()
      setAlteraVendedora(!modalAlteraVendedora)

    } else if (res.status === 200) {
      alert(res.data.error);
    }
  }
  }



  return (

    <Container className="content">


      <Row>
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
                
                {fila.id_status === 1 && fila.rnk===1 ? <Brightness1Icon style={{ color: yellow[500], fontSize: 25 }} /> :
                fila.id_status === 1 ?  <Brightness1Icon style={{ color: green[500], fontSize: 25 }} /> :
                  fila.id_status === 2 ? <RecordVoiceOverIcon style={{ color: blue[500], fontSize: 25 }} /> :
                    fila.id_status === 3 ? <PhoneInTalkIcon style={{ color: '#FFC107', fontSize: 25 }} /> :
                      fila.id_status === 4 ? <HighlightOffIcon style={{ color: blue[500], fontSize: 25 }} /> :
                       ''}
                {' '}
                {fila.status}</th>
              <td>{fila.data_entrada}</td>
              <td>{fila.nome_vendedor} {fila.id_status === 2 ? <IconButton  style={{  padding: 0  }} color="secondary" aria-label="add an alarm" onClick={(e) => togleAlteraVendedora({id: fila.id})}><EditOutlinedIcon  /></IconButton>  : ''} </td>
              <td>{fila.ramal}</td>
              <td style={{ 'display': 'flex', 'justifyContent': 'space-around' }}>
                {/* <div id="mmacao"> */}
                <Button outline size="sm" onClick={(e) => setDisponivel({ nome: fila.nome_vendedor, id: fila.id, id_status: fila.id_status })}><Brightness1Icon style={{ color: green[500], fontSize: 25 }} /></Button>
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

            <th colSpan="1">

              <Button outline color="success" onClick={(e) => toggle()}><span><AddCircleOutlineIcon style={{ color: green[500] }}
                fontSize="large" /></span> ADICIONAR VENDEDOR(A)</Button>
            </th>

            <th colSpan="2">{somaatedimento === 0 ? 'Nenhum atendimento ' : somaatedimento === 1 ? somaatedimento + ' Atendimento ' : somaatedimento + ' Atendimentos '} hoje</th>
            <th colSpan="2">{ttelefone === 0 ? 'Nenhum telefonema ' : ttelefone === 1 ? ttelefone + ' Telefonema ' : ttelefone + ' Telefonemas '} hoje</th>


          </tr>
        </tfoot>
      </table>
      {/* </div> */}


      </Row>
      <Row>
        <Link to="/"><Button color="primary" style={{'marginTop': '10px','marginBottom': '20px'}}>VOLTAR</Button></Link>

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
          <Button color="success" onClick={() => disponivel({id:modalConfDelId})}>SIM</Button>{' '}
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

      <Modal isOpen={modalTipoAtendimento} fade={false} >
        <ModalHeader  >< ContactPhoneIcon style={{ color: blue[500], fontSize: 45 }} /> Informe o tipo de atendimento:</ModalHeader>
        <ModalBody>
          <div id='divmodalsetretorno'>
            <Button outline color="primary" onClick={() => toggleTipoAtendimento({ id_retorno: 1 })}><span><ThumbUpIcon style={{ color: blue[700], fontSize: 35 }} /></span>  ATENDIMENTO</Button>
            <Button outline color="warning" onClick={() => toggleTipoAtendimento({ id_retorno: 2 })} ><span><ReplayIcon style={{ color: yellow[900], fontSize: 35 }} /></span>RETORNO DE ORÇAMENTO</Button>
          </div>         
        </ModalBody>

      </Modal>


      <Modal isOpen={modalArquiteto} fade={false} >
        <ModalHeader  >< GroupAddIcon style={{ color: purple[500], fontSize: 45 }} />  O atendimento foi <b>'com'</b> ou <b>'sem'</b> arquiteto(a):</ModalHeader>
        <ModalBody>
          <div id='divmodalsetretorno'>
            <Button outline color="primary" onClick={() => toggleArquiteto({ arquiteto: 1 })}><span><DomainIcon style={{ fontSize: 35 }} /></span>  <b>COM</b> ARQUITETO(A)</Button>
            <Button outline color="warning" onClick={() => toggleArquiteto({ arquiteto: 0 })} ><span><DomainDisabledIcon style={{ color: yellow[900], fontSize: 35 }} /></span> <b>SEM</b> ARQUITETO(A)</Button>
          </div>         
        </ModalBody>

      </Modal>



      <Modal isOpen={modalAlteraVendedora} fade={false} toggle={togleAlteraVendedora} >
        <ModalHeader toggle={togleAlteraVendedora}>ALTERA VENDEDOR(A) EM ATENDIMENTO</ModalHeader>
        <ModalBody>
          <Form>

            <FormGroup>
              <Label for="selectVendedor">Informe o novo vendendor para esse atendimento</Label>
              <Input type="select" name="selectVendedor" id="selectVendedor" onChange={e => setVendedor_id(e.target.value)}>
                <option></option>
                {listaSelectVendedor.map(list =>
                  <option value={list.id}>{list.nome_vendedor}</option>

                )
                }

              </Input>
            </FormGroup>

           
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={(e)=>alteraVendedorAtendimento()}>SALVAR</Button>
          <Button color="danger" onClick={togleAlteraVendedora}>CANCELAR</Button>
        </ModalFooter>
      </Modal>


    </Container>





  )




}
