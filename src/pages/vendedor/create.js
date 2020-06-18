import React, { useState }  from 'react';
import { Link ,useHistory} from 'react-router-dom'


import api from '../services/api';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default function Create() {
    const history = useHistory()

    const [nome_vendedor, setNome_vendedor] = useState('');

    async function handMesa(e) {
        e.preventDefault();
        const data = { nome_vendedor };
        const res = await api.post('vendedor', data);

        if (res.status === 201) {
            setNome_vendedor('');
           
            history.push('/vendedor') 
    

        } else if (res.status === 200) {
            alert(res.data.error);
        }
    }

  
   
return (
    <Container fluid>
    <h1>Cadastro Vendedor</h1>

   
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

                <Form.Group controlId="formGroupPassword">
                    <Form.Label>NOME VENDEDOR(A)</Form.Label>
                    <Form.Control
                        type="text"
                        
                        value={nome_vendedor}
                        
                        onChange={e => setNome_vendedor(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formGroupButton">
                    <Form.Label></Form.Label>

                    <Button name="salvar" className="buttonsalvar" type="submit" variant="success">Cadastrar</Button>
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




