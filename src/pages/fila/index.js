import React, {useState} from 'react';
import { Link } from 'react-router-dom'

import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylefila.css';
import { Style } from '@material-ui/icons';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
        return { width: '5%', textAlign: 'center' , class: 'hidden-xs' };
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


      const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
      ];
      
      function getStyles(name, personName, theme) {
        return {
          fontWeight:
            personName.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }
      
export default function Index() {

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  function handleClickOpen() {
    setOpen(true);
  };


  function handleClose()  {
    setOpen(false);
  };


return(
    <Container fluid>
        <div className='filaloja' >
          <div className='table'>
                <BootstrapTable keyField='id' 
                data={ products } 
                columns={ columns } 
                noDataIndication="Não existe mesas cadastradas"
                 />
           </div>
           <div className='menufilaloja'>
           <IconButton aria-label="delete"  onClick={handleClickOpen}>
  <AddCircleIcon />
</IconButton>
          </div>

    </div>
   

    <Button className="primary"><Link  to='/' >Voltar para Home</Link> </Button> 

     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ADICIONAR VENDEDOR(A) NA FILA</DialogTitle>
        <DialogContent>
         <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label">Vendedor</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label">Mesa</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </Container>

    
)

}
