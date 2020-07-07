import React ,{ useState, useEffect }from 'react';
import { Link ,useHistory} from 'react-router-dom'

import { isTokenExpired } from "../services/auth"; 

import BootstrapTable from 'react-bootstrap-table-next';

import {MenuPrincipal} from '../principal/menu/menu'
import Button01 from '@material-ui/core/Button';
import { EditOutlined, DeleteOutline } from '@material-ui/icons';
import {
    Container
  } from 'reactstrap';



import './auditoriastyles.css';

import api from '../services/api';


export default function Usuario() {

    const history = useHistory();

    // const [mesa, setMesa] = useState('');
    // const [ramal, setRamal] = useState('');
    const [listaMesa, setaListaMesa] = useState([]);


    const logged = isTokenExpired();
    if(logged===false){
      history.push('/login')
    }


    //console.log(listaMesa);
    const products = listaMesa;
    const columns = [ {
      dataField: 'id',
      text: 'ID',
      hidden:true
    }, {
      dataField: 'data_log',
      text: 'DATA',
      sort: true
    }, {
      dataField: 'status',
      text: 'STATUS',
      sort: true
    }, {
      dataField: 'descricao',
      text: 'AÇÃO',
      sort: true
    }, {
      dataField: 'retorno',
      text: 'RETORNO',
      sort: true
    }, {
      dataField: 'arquiteto',
      text: 'ARQUITETO',
      sort: true
    }];


  async  function recall() {    
       await api.get('auditoria').then(
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
        api.get('auditoria').then(
            response => {
                setaListaMesa(response.data)
                //const rows = response.data
            }
        )
    }, [])

   

    return (

        
        <Container className='content'>

            <MenuPrincipal />
            <h1>Auditoria</h1>

           
            <hr />

            <div className="listagem2">
            <BootstrapTable keyField='id' 
                data={ products } 
                columns={ columns } 
                noDataIndication="Não existe usuários cadastrados"
                striped
            hover
            condensed
                 />
            
            </div>

            
            
            

            
            <Link to="/">
            <button className="buttonnovamesa" type="button" variant="warnning"> Voltar</button>
            
            </Link>
        </Container>


    )

}