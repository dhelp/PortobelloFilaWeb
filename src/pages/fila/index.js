import React, {useState} from 'react';
import { Link } from 'react-router-dom'

import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylefila.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import { green, purple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
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
  margin: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 200,
      },
  
}));


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);






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
     


      

      
      
      
export default function Index() {

  const classes = useStyles();


  const [open, setOpen] = useState(false);

  const [vendedor, setVendedor] = useState({
    age: '',
    name: 'hai',
  });

  const [mesa, setMesa] = useState({
    mesa: '',
    name: '155',
  });

  const handleChangeVendedor = (event) => {
    setVendedor(event.target.value);
  };

  const handleChangeMesa = (event) => {
    setMesa(event.target.value);
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
    <div className='filateste'>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
   

    <Button className="primary"><Link  to='/' >Voltar para Home</Link> </Button> 

     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ADICIONAR VENDEDOR(A) NA FILA</DialogTitle>
        <DialogContent>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-vendedor-native-simple">Vendedor(a)</InputLabel>
        <Select
          native
          value={vendedor}
          onChange={handleChangeVendedor}
          label="Vendedor(a)"
          inputProps={{
            name: 'vendedor',
            id: 'outlined-vendedor-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
      
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-mesa-native-simple">Mesa</InputLabel>
        <Select
          native
          value={mesa}
          onChange={handleChangeMesa}
          label="Mesa"
          inputProps={{
            name: 'mesa',
            id: 'outlined-mesa-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>215</option>
          <option value={20}>265</option>
          <option value={30}>654</option>
        </Select>
      </FormControl>
            
        </DialogContent>
        <DialogActions>
        <ThemeProvider theme={theme}>
          <Button   onClick={handleClose} color="secondary" className={classes.margin}>
            Cancelar
          </Button >
          </ThemeProvider>
          <ColorButton   onClick={handleClose} color="secondary">
            Salvar
          </ColorButton >
        </DialogActions>
      </Dialog>
    </Container>

    
)

}
