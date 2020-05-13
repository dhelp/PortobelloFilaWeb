import React, { useState, useEffect } from 'react';


//import DataGrid from 'react-data-grid';

import Button01 from '@material-ui/core/Button';

import { EditOutlined, DeleteOutline } from '@material-ui/icons';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';





import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import api from '../services/api';


export default function Mesa() {

    const [mesa, setMesa] = useState('');
    const [ramal, setRamal] = useState('');
    const [listaMesa, setaListaMesa] = useState([]);





  async  function recall() {

        
       await api.get('mesa').then(
            response => {
                setaListaMesa(response.data)

            }
        )
    }


    function editar(){


    }


    async function handMesa(e) {
        e.preventDefault();
        const data = { mesa, ramal };
        const res = await api.post('mesa', data);

        if (res.status === 201) {
            setMesa('');
            setRamal('');
            recall();
            alert("Mesa cadastrada com sucesso");


        } else if (res.status === 200) {
            alert(res.data.error);
        }
    }

    async function handleClick(e) {
        //e.preventDefault();
        await api.delete(`mesa/${e}`);
        recall();
        
    }


    useEffect(() => {
        api.get('mesa').then(
            response => {
                setaListaMesa(response.data)
                //const rows = response.data
            }
        )
    }, [])

   

    return (
        <Container fluid>

            <h1>Cadastro de Mesas e Ramal</h1>

           
            <hr />





            <Form className="cadastro" onSubmit={handMesa}>
                <Row>
                    <Col>
                    <Form.Group controlId="formGroupEmail">
                            
                            <Form.Control
                                type="text"
                                placeholder="id"
                                
                                hidden
                                />
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>MESA</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Informe o nome/número da mesa"
                                value={mesa}
                                onChange={e => setMesa(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>RAMAL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Informe o ramal da mesa"
                                value={ramal}
                                onChange={e => setRamal(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formGroupButton">
                            <Form.Label></Form.Label>

                            <Button name="salvar" className="buttonsalvar" type="submit" variant="success">Cadastrar</Button>
                        </Form.Group>

                    </Col>
                </Row>
                

            </Form>
            <hr />



            <div className="listagem">
                <Table striped bordered hover>
                    <thead>
                        <tr >
                            <th hidden >id</th>
                            <th >AÇÃO </th>
                            <th >MESA</th>
                            <th>RAMAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaMesa.map(l => (
                            <tr key={l.id}>
                                <td hidden>{l.id}</td>
                                <th>
                                
                                

                                <Button01  className="buttonAcao"
                                        startIcon={<EditOutlined/>}
                                        item={l.id}
                                        onClick={(e) => handleClick(l.id)}
                                    ></Button01>

                                    <Button01 className="buttonAcao"
                                        startIcon={<DeleteOutline/>}
                                        item={l.id}
                                        onClick={(e) => handleClick(l.id)}
                                    ></Button01>


                                </th>
                                <td>{l.mesa}</td>
                                <td>{l.ramal}</td>
                            </tr>
                        ))}


                    </tbody>
                </Table>
            </div>





        </Container>


    )

}