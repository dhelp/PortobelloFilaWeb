import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom'


import api from '../services/api';

import {
    Container
  } from 'reactstrap';

  import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default function Show() {

    const history = useHistory();



    const [nome_usuario, setNome_usuario] = useState([]);
    const [senha_usuario, setSenha_usuario] = useState([]);


    // useEffect(() => {

    //     const fetchData = async () => {

    //         const result = await api.get(`usuario/show/${id}`);

    //         setIdUsuario(result.data.id)
    //         setNome_usuario(result.data.nome_usuario)


    //     };
    //     fetchData();
    // }, []);


    async function handleEdit(e) {

        e.preventDefault()
        const data = {
            nome_usuario, senha_usuario 
        }


        const res = await api.post(`usuario/create`, data);

        if (res.status === 201) {
            //alert("Mesa alterada com sucesso");
            history.push("/usuario")

        } else {

            alert(res.data.error);
        }
    }

    return (


        <Container className='content'>

            <h1>Cadastrar Usuário</h1>
            <hr />

            <Form className="cadastro" onSubmit={handleEdit} >
                <Row>

                    <Col>

                        
                        <Form.Group controlId="formGroupMesa">
                            <Form.Label>NOME USUÁRIO(A)</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="new-password"
                                name="nome_usuario"
                                defaultValue={nome_usuario}
                                onChange={e => setNome_usuario(e.target.value)}
                            />
                            
                        </Form.Group>
                        <Form.Group controlId="formGroupMesa">
                            <Form.Label>SENHA</Form.Label>
                            <Form.Control
                                type="password"
                                autoComplete="new-password"
                                name="senha_usuario"
                                defaultValue={senha_usuario}
                                onChange={e => setSenha_usuario(e.target.value)}
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
                            <Link to="/usuario">
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




