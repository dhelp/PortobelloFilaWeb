import React ,{ useState, useEffect }from 'react';
import { Link } from 'react-router-dom'

import {
    ButtonToggle 
  } from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';

import {MenuPrincipal} from '../principal/menu/menu'
import Button01 from '@material-ui/core/Button';
import { EditOutlined, DeleteOutline } from '@material-ui/icons';
import Container from 'react-bootstrap/Container';



import 'bootstrap/dist/css/bootstrap.min.css';
import './vendedorstyles.css';

import api from '../services/api';


export default function Vendedor() {

    // const [mesa, setMesa] = useState('');
    // const [ramal, setRamal] = useState('');
    const [listaMesa, setaListaMesa] = useState([]);

    console.log(listaMesa);
    const products = listaMesa;
    const columns = [ {
        text: 'AÇÃO',
        formatter: (cell, row, rowIndex, extraData) => (
            <div>
                <Link to={`/vendedor/show/${row.id}`}>
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
      dataField: 'nome_vendedor',
      text: 'VENDEDOR(A)',
      sort: true
    }];


  async  function recall() {    
       await api.get('vendedor').then(
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
        await api.delete(`vendedor/${e}`);
        recall();
        
    }


    useEffect(() => {
        api.get('vendedor').then(
            response => {
                setaListaMesa(response.data)
                //const rows = response.data
            }
        )
    }, [])

   

    return (

        
        <Container fluid>

            <MenuPrincipal />
            <h1>Listagem de Vendedores</h1>

           
            <hr />

            <div className="listagem2">
            <BootstrapTable keyField='id' 
                data={ products } 
                columns={ columns } 
                noDataIndication="Não existe vendedor cadastradas"
                striped
            hover
            condensed
                 />
            
            </div>

            
            <Link to="/vendedor/create">
            <ButtonToggle    color="success" >CADASTRAR VENDEDOR(A)</ButtonToggle ></Link>{' '}
            
            <Link to="/">
            <ButtonToggle  color="warning" >VOLTAR</ButtonToggle >
            
            </Link>
            
            
            

            

        </Container>


    )

}