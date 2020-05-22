import React , { useState, useEffect } from 'react';
import { Link ,useHistory} from 'react-router-dom'


import api from '../services/api';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default function MesaEdit(props) {
    const history = useHistory();
    //const id = props.match.params.id;

    const [id, setId] = useState(props.match.params.id);   
 const [ramal, setRamal] = useState([]); 
 const [mesa, setMesa] = useState([]); 
   const [load, setLoad] = useState([]);

    useEffect(() => {  
       
        const fetchData = async () => {
            console.log(`mesa/show/${id}`);
            const result =await api.get(`mesa/show/${id}`);
            setLoad(result.data)
            setId(result.data.id)
            setRamal(result.data.ramal)
            setMesa(result.data.mesa)
            console.log(result.data);
      
            };

            
        
            fetchData();
        
}, []); 


async function handleEdit(e){
    
    e.preventDefault()
    const data = {
        id,
        mesa,
        ramal,
    }
    // console.log(data);

    //  const data = props.match.body.mesa

    //  console.log(data);
    
    const res = await api.put(`mesa/edit/${id}`,data );
    console.log(res);
    if (res.status === 200) {
        console.log(res);
        //alert("Mesa alterada com sucesso");
        history.push("/mesa")

    } else {
        console.log(res);
        alert(res.data.error);
    }
}

return (


<Container fluid>
    
    <h1>Editando Mesa e Ramal</h1>
    <hr />

    <Form className="cadastro"  onSubmit={handleEdit} >
        <Row>
        
            <Col>
            
            <Form.Group controlId="formGroupID" >
                    
                    <Form.Control
                        type="text"
                        placeholder="id"
                        defaultValue={id}
                        hidden
                        autoComplete="new-password"
                        />
                </Form.Group>
                <Form.Group controlId="formGroupMesa">
                    <Form.Label>MESA</Form.Label>
                    <Form.Control
                        type="text"
                        autoComplete="new-password"
                        name = "mesa"
                        defaultValue={mesa}
                        onChange={e => setMesa(e.target.value)}
                         />
                </Form.Group>

                <Form.Group controlId="formGroupRamal">
                    <Form.Label>RAMAL</Form.Label>
                    <Form.Control
                    name = "ramal"
                        type="number"
                        autoComplete="new-password"
                        defaultValue={ramal}
                        onChange={e => setRamal(e.target.value)}
                        pattern="[0-9]*" inputmode="numeric"
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
                    <Link to="/mesa">
                    <Button name="salvar" className="buttonsalvar" type="button" variant="danger">Voltar</Button>
                    </Link>
                </Form.Group>
           
            </Col>
       
        </Row>
        

    </Form>
  
    <hr />

    </Container>


)};




