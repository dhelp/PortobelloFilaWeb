import React, { useState, useEffect } from 'react';
//import DataGrid from 'react-data-grid';

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

    

    //const rows = listaMesa;


    function recall(){

        api.get('mesa').then(
            response => {
                setaListaMesa(response.data)
                
            }
        )
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
        <div className="mesa-content">
            <h1>Cadastro de Mesas e Ramal</h1>
            <hr />
            
            <section className="cadastro">
                <form onSubmit={handMesa}>

                
                    <div className="row">
                        <label>
                            Mesa:
                            </label>
                    <input
                                type="text"
                                placeholder="Informe o número da mesa"
                                value={mesa}
                                onChange={e => setMesa(e.target.value)}
                            />
                        
                        </div>
                        <div className="row">
                        <label>
                            Ramal:
                            </label>
                    <input
                    type="text"
                                placeholder="Informe o ramal"
                                value={ramal}
                                onChange={e => setRamal(e.target.value)}
                            />
                        
                        </div>
                        <div className="row">
                        <button className="button" type="submit">Cadastrar</button>
                    </div>


                    


                </form>
               </section>




<Form onSubmit={handMesa}>
  <Row>
    <Col>
    <Form.Group controlId="formGroupEmail">
    <Form.Label>MESA</Form.Label>
    <Form.Control 
                type="text" 
                placeholder="Informe o nome/número da mesa"
                value={mesa}
                onChange={e => setMesa(e.target.value)} />
  </Form.Group>
    </Col>
    <Col>
    <Form.Group controlId="formGroupPassword">
    <Form.Label>RAMAL</Form.Label>
    <Form.Control 
                type="text" 
                placeholder="Informe o ramal da mesa"
                value={ramal}
                onChange={e => setRamal(e.target.value)} />
  </Form.Group>
    </Col>
    <Col>
    <Form.Group controlId="formGroupButton">
    <Form.Label></Form.Label>
      
      <Button className="button" type="submit" variant="success">Salvar</Button>
      </Form.Group>
    </Col>
  </Row>
</Form>
            <hr />

            

            <div className="listagem">
            <Table striped bordered hover>
            <thead>
                <tr>
                <th hidden >id</th>
                <th>MESA</th>
                <th>RAMAL</th>
                </tr>
            </thead>
            <tbody>
                {listaMesa.map(l => (
                <tr key={l.id}>
                <td hidden>{l.id}</td>
                <td>{l.mesa}</td>
                <td>{l.ramal}</td>
                </tr>
                ))}
                
                
            </tbody>
            </Table>
            </div>


            

        </div>
        </Container>


    )

}