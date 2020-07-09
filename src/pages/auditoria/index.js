import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Link, useHistory } from 'react-router-dom'


import { isTokenExpired } from "../services/auth";

import ExportCSV  from '../services/ExportCSV'

import { CSVLink, CSVDownload } from "react-csv";




//import BootstrapTable from 'react-bootstrap-table-next';

import { MenuPrincipal } from '../principal/menu/menu'
import Button01 from '@material-ui/core/Button';
import { EditOutlined, DeleteOutline, ListAlt } from '@material-ui/icons';
import {
  Container, Col, Row, Button, Form, FormGroup, Label, Input, Card, CardHeader, CardFooter, CardBody,
  CardTitle, CardText
} from 'reactstrap';

import { TablePagination } from 'react-pagination-table';

import './auditoriastyles.css';

import api from '../services/api';


import Pagination from './pagination'


export default function Usuario() {

  const history = useHistory();

  // const [mesa, setMesa] = useState('');
  // const [ramal, setRamal] = useState('');
  const [listaMesa, setaListaMesa] = useState([]);
  const [listaStatus, setaListaStatus] = useState([]);
  const [listaVendedor, setaListaVendedor] = useState([]);

  const [dataDe, setaDataDe] = useState([]);
  const [dataAte, setaDataAte] = useState([]);
  const [idfilastatus, setaIdfilastatus] = useState([]);
  const [idRetorno, setaIdRetorno] = useState([]);
  const [idVendedor, setaIdVendedor] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);



 
  const logged = isTokenExpired();
  if (logged === false) {
    history.push('/login')
  }


  //console.log(listaMesa);
  const data = listaMesa;

  const Header = ["id", "data_log", "status", "descricao", "retorno", "arquiteto"];

  // const columns = [{
  //   dataField: 'id',
  //   text: 'ID',
  //   hidden: true
  // }, {
  //   dataField: 'data_log',
  //   text: 'DATA',
  //   sort: true
  // }, {
  //   dataField: 'status',
  //   text: 'STATUS',
  //   sort: true
  // }, {
  //   dataField: 'descricao',
  //   text: 'AÇÃO',
  //   sort: true
  // }, {
  //   dataField: 'retorno',
  //   text: 'RETORNO',
  //   sort: true
  // }, {
  //   dataField: 'arquiteto',
  //   text: 'ARQUITETO',
  //   sort: true
  // }];


  async function recall() {
    await api.get('auditoria').then(
      response => {
        setaListaMesa(response.data)
      }
    )
  }





  // async function handMesa(e) {
  //     e.preventDefault();
  //     const data = { mesa, ramal };
  //     const res = await api.post('mesa', data);

  //     if (res.status === 201) {
  //         setMesa('');
  //         setRamal('');
  //         recall();
  //         //alert("Mesa cadastrada com sucesso");


  //     } else if (res.status === 200) {
  //         alert(res.data.error);
  //     }
  // }

  async function handleClick(e) {
    //e.preventDefault();
    await api.delete(`mesa/delete/${e}`);
    recall();

  }


  useEffect(() => {
    const fetchAuditoria = async () => {
      setLoading(true);
      const response = await api.get('auditoria')

      setaListaMesa(response.data)
      setLoading(false);
    }
    fetchAuditoria();
  }, [])

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = listaMesa.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const csvData= listaMesa;

  useEffect(() => {
    api.get('listafilastatus').then(
      response => {
        setaListaStatus(response.data)
      }
    )
  }, [])


  useEffect(() => {
    api.get('vendedor').then(
      response => {
        setaListaVendedor(response.data)

      }
    )
  }, [])

  function handPesquisa() {
  //  alert(dataDe);
  }


  return (


    <Container className='content'>

      <MenuPrincipal />
      <h1>Auditoria</h1>
      <div>
        <Card >
          <CardHeader color="success">Pesquisa</CardHeader>

          <CardBody>
            <Form inline onSubmit={handPesquisa} autocomplete="off">

              <Row form>
                <Col md={2}>
                  <FormGroup>
                    <Label for="dataDe">Data De</Label>
                    <Input type="date" name="datade" id="dataDe" onChange={e => setaDataDe(e.target.value)} />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="dataAte">Data Até</Label>
                    <Input type="date" name="dataate" id="dataAte" onChange={e => setaDataAte(e.target.value)} />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="status">Status</Label>
                    <Input style={{ 'width': '100%' }} type="select" name="id_fila_status" id="id_fila_status" onChange={e => setaIdfilastatus(e.target.value)}>
                      <option></option>
                      {listaStatus.map(list =>
                        <option value={list.id}>{list.descricao}</option>

                      )
                      }

                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="retorno">Retorno</Label>
                    <Input style={{ 'width': '100%' }} type="select" name="id_retorno" id="id_retorno" onChange={e => setaIdRetorno(e.target.value)}>
                      <option></option>

                      <option value="1">Atendimento</option>
                      <option value="2">Retorno de Orçamento</option>



                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>

                  <FormGroup>
                    <Label for="id_vendedor">Vendedor</Label>
                    <Input style={{ 'width': '100%' }} type="select" name="id_vendedor" id="id_vendedor" onChange={e => setaIdVendedor(e.target.value)}>
                      <option></option>
                      {listaVendedor.map(list =>
                        <option value={list.id}>{list.nome_vendedor}</option>

                      )
                      }

                    </Input>

                  </FormGroup>

                </Col>


              </Row>


            </Form>
          </CardBody>
          <CardFooter><Button color='primary' onClick={() => handPesquisa()} >Filtrar</Button></CardFooter>

        </Card>
      </div>

      <hr />

      <div>
        <table className="ui blue celled padded table">
          <thead>
            <tr>

              <th>DATA</th>
              <th>STATUS</th>
              <th>DESCRIÇÃO</th>
              <th>RETORNO</th>
              <th>ARQUITETO</th>
            </tr></thead>
          <tbody>
                      
            {currentPosts.map(fila => (
              <tr key={fila.id}>

                <td>{fila.data_log}</td>
                <td>{fila.status}</td>

                <td>{fila.descricao}</td>
                <td>{fila.retorno}</td>
                <td >
                  {fila.arquiteto}
                </td>

              </tr>


            ))}


          </tbody>
          <tfoot>
          
            <tr>
              <th><ExportCSV csvData={csvData} fileName="auditoria" nameButton='Exportar Excel' /></th>
              <th colspan="4">
              <Pagination postPerPage={postPerPage} totalPosts={listaMesa.length} paginate={paginate} pp={currentPage} />
            </th>
            </tr></tfoot>
        </table>
      </div>





      <Link to="/">
        <button className="buttonnovamesa" type="button" variant="warnning"> Voltar</button>

      </Link>
    </Container>


  )

}