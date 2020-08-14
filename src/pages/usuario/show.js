import React, { useState, useEffect } from 'react';
import { Link, useHistory , useParams} from 'react-router-dom'


import api from '../services/api';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default function Show() {
    const { id } = useParams();

 
    const history = useHistory();


    const [idUsuario, setIdUsuario] = useState(id);
    const [nome_usuario, setNome_usuario] = useState([]);
    const [tipo_usuario, setTipo_usuario] = useState([]);
    const [usuario_tipo, setUsuario_tipo] = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            
            const result = await api.get(`usuario/show/${id}`);
            
            setIdUsuario(result.data.id)
            setNome_usuario(result.data.nome_usuario)
            setTipo_usuario(result.data.usuario_tipo_id)

        };
        fetchData();
    }, []);

    useEffect(() => {
        api.get('usuariotipo').then(
            response => {
                setUsuario_tipo(response.data)
                //const rows = response.data
            }
        )
    }, [])

    async function handleEdit(e) {

        e.preventDefault()
        const data = {
            id: idUsuario,
            nome_usuario,
            id_tipo: tipo_usuario

        }
        

      

        

        const res = await api.put(`usuario/${id}`, data);
        
        if (res.status === 200) {
            //alert("Mesa alterada com sucesso");
            history.push("/usuario")

        } else {
            
            alert(res.data.error);
        }
    }

    return (


        <Container fluid>

            <h1>Editando Usuário</h1>
            <hr />

            <Form className="cadastro" onSubmit={handleEdit} >
                <Row>

                    <Col>

                        <Form.Group controlId="formGroupID" >

                            <Form.Control
                                type="text"
                                placeholder="idUsuario"
                                defaultValue={idUsuario}
                                hidden
                                autoComplete="new-password"
                            />
                        </Form.Group>

                        <Form.Group controlId="formGroupID">
                            <Form.Label>NOME USUÁRIO</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="new-password"
                                name="nome_usuario"
                                defaultValue={nome_usuario}
                                onChange={e => setNome_usuario(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formGroupMesa">
                            <Form.Label>TIPO</Form.Label>
                            <select id="tipo_usuario" name="tipo_usuario" class="form-control" onChange={e => setTipo_usuario(e.target.value)}  value={tipo_usuario} >

                                
                                {usuario_tipo.map(list =>
                                    <option value={list.id}>{list.tipo}</option>

                                )
                                }

                            </select>

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




