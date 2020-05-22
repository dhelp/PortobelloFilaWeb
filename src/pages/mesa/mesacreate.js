import React, { useState }  from 'react';
import { Link ,useHistory} from 'react-router-dom'


import api from '../services/api';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default function MesaCreate() {
    const history = useHistory()

    const [mesa, setMesa] = useState('');
    const [ramal, setRamal] = useState('');

    async function handMesa(e) {
        e.preventDefault();
        const data = { mesa, ramal };
        const res = await api.post('mesa/create', data);

        if (res.status === 201) {
            setMesa('');
            setRamal('');
            history.push('/mesa') 
    

        } else if (res.status === 200) {
            alert(res.data.error);
        }
    }

  
   
return (
    <Container fluid>
    <h1>Cadastro de Mesas e Ramal</h1>

   
    <hr />





    <Form className="cadastro" onSubmit={handMesa} autocomplete="off">
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
                        type="number"
                        placeholder="Informe o ramal da mesa"
                        value={ramal}
                        pattern="[0-9]*" inputmode="numeric"
                        onChange={e => setRamal(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formGroupButton">
                    <Form.Label></Form.Label>

                    <Button name="salvar" className="buttonsalvar" type="submit" variant="success">Cadastrar</Button>
                    <Link to="/mesa">
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




