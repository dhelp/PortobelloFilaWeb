import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom'


import api from '../services/api';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default function Show() {
    const { id } = useParams();
    const history = useHistory();
    

   

    const [idVendedor, setIdVendedor] = useState(id);
    const [nome_vendedor, setNome_vendedor] = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            
            const result = await api.get(`vendedor/show/${id}`);
            
            setIdVendedor(result.data.id)
            setNome_vendedor(result.data.nome_vendedor)


        };
        fetchData();
    }, []);


    async function handleEdit(e) {

        e.preventDefault()
        const data = {
            id: idVendedor,
            nome_vendedor,

        }
        

      

        

        const res = await api.put(`vendedor/${id}`, data);
        
        if (res.status === 200) {
            //alert("Mesa alterada com sucesso");
            history.push("/vendedor")

        } else {
            
            alert(res.data.error);
        }
    }

    return (


        <Container fluid>

            <h1>Editando Vendedor</h1>
            <hr />

            <Form className="cadastro" onSubmit={handleEdit} >
                <Row>

                    <Col>

                        <Form.Group controlId="formGroupID" >

                            <Form.Control
                                type="text"
                                placeholder="idVendedor"
                                defaultValue={idVendedor}
                                hidden
                                autoComplete="new-password"
                            />
                        </Form.Group>
                        <Form.Group controlId="formGroupMesa">
                            <Form.Label>NOME VENDEDOR(A)</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="new-password"
                                name="nome_vendedor"
                                defaultValue={nome_vendedor}
                                onChange={e => setNome_vendedor(e.target.value)}
                            />
                        </Form.Group>



                        <Form.Group controlId="formGroupButton">
                            <Form.Label></Form.Label>

                            <Button
                                name="salvar"
                                className="buttonsalvar"

                                variant="success"
                                type="submit"
                            >Salvar
                        </Button>
                            <Link to="/vendedor">
                                <Button name="salvar" className="buttonsalvar" type="button" variant="danger">Voltar</Button>
                            </Link>
                        </Form.Group>

                    </Col>

                </Row>


            </Form>

            <hr />

        </Container>


    )
};




