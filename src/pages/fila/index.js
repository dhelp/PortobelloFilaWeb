import React from 'react';
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';

import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Style } from '@material-ui/icons';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const products = [{id:1,status:'DISPONIVEL',hora:'00:30', vendedor:"AUGUSTO", ramal: 1212}];
    const columns = [ {
      dataField: 'id',
      text: 'ID',
      hidden:true
    }, {
      dataField: 'status',
      text: 'STATUS',
      headerStyle: (colum, colIndex) => {
        return { width: '20%', textAlign: 'center' };
      }
    }, {
      dataField: 'hora',
      text: 'HORA',
      headerStyle: (colum, colIndex) => {
        return { width: '5%', textAlign: 'center' };
      }
    }, {
        dataField: 'vendedor',
        text: 'VENDEDOR(A)',
        headerStyle: (colum, colIndex) => {
            return { width: '30%', textAlign: 'center' };
          }
      }, {
        dataField: 'ramal',
        text: 'RAMAL',
        headerStyle: (colum, colIndex) => {
            return { width: '10%', textAlign: 'center' };
          }
      }, {
        dataField: 'acao',
        text: 'AÇÃO',
        
        headerStyle: (colum, colIndex) => {
          return { width: '25%', textAlign: 'center' };
        }
      }];

export default function teste() {

return(
    <Container fluid>
        <div className='filaloja' >
        <BootstrapTable keyField='id' 
                data={ products } 
                columns={ columns } 
                noDataIndication="Não existe mesas cadastradas"
                
            
               
                 />
    </div>
    <div className='filaarquiteta' >
    <BootstrapTable keyField='id' 
                data={ products } 
                columns={ columns } 
                noDataIndication="Não existe mesas cadastradas"
                striped
            hover
            condensed
                 />
    </div>
    <Link className='btn-voltar'  to='/' >Voltar para Home</Link>
    </Container>
)

}
