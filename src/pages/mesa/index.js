import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import BootstrapTable from 'react-bootstrap-table-next';

import {MenuPrincipal} from '../principal/menu/menu'




import Button01 from '@material-ui/core/Button';
//import IconButton from '@material-ui/core/IconButton';

import { EditOutlined, DeleteOutline } from '@material-ui/icons';

import Container from 'react-bootstrap/Container';
// import Table from 'react-bootstrap/Table';
// import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Button from 'react-bootstrap/Button';





import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import api from '../services/api';


export default function Mesa() {

    // const [mesa, setMesa] = useState('');
    // const [ramal, setRamal] = useState('');
    const [listaMesa, setaListaMesa] = useState([]);

    //console.log(listaMesa);
    const products = listaMesa;
    const columns = [ {
        text: 'AÇÃO',
        formatter: (cell, row, rowIndex, extraData) => (
            <div>
                <Link to={`/mesa/show/${row.id}`}>
              <Button01  className="buttonAcao"
                                        startIcon={<EditOutlined/>}
                                        item={row.id}
                                        
                                    ></Button01>
                                    </Link>


                        
                                    <Button01 className="buttonAcao"
                                    startIcon={<DeleteOutline/>}
                                    item={row.id}
                                    onClick={() => handleClick(row.id)}
                                    >   </Button01>

            </div>
          ),
          headerStyle: (column, colIndex) => {
            return { width: '13%',  }; 
        },
        align:'center'
      },{
      dataField: 'id',
      text: 'ID',
      hidden:true
    }, {
      dataField: 'mesa',
      text: 'MESA',
      sort: true
    }, {
      dataField: 'ramal',
      text: 'RAMAL',
      sort: true
    }];


  async  function recall() {    
       await api.get('mesa').then(
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
        api.get('mesa').then(
            response => {
                setaListaMesa(response.data)
                //const rows = response.data
            }
        )
    }, [])

   

    return (

        
        <Container fluid>

            <MenuPrincipal />
            <h1>Listagem de Mesas e Ramal</h1>

           
            <hr />

            <div className="listagem2">
            <BootstrapTable keyField='id' 
                data={ products } 
                columns={ columns } 
                noDataIndication="Não existe mesas cadastradas"
                striped
            hover
            condensed
                 />
            
            </div>

            
            <Link to="/mesa/create">
            <button className="buttonnovamesa" type="button" variant="success"> Cadastrar nova mesa</button>
            </Link>

        </Container>


    )

}