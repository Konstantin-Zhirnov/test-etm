import React, { useState, useEffect } from 'react';
import Form from '../Form/Form'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loader from '../UI/Loader/Loader'
import { setGoods, setIsData } from '../store/actions/goods'
import axios from '../axios/axioas-etm'

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';



const useStyles = makeStyles((theme) => ({
  h2: {
    fontSize: 'calc(18px + 2vw)',
    textAlign: 'center',
    marginTop: '50px'
  },
  tableContainer: {
    margin: "50px 0 100px",
  },
  tableRow: {
    cursor: "pointer",
    '&:hover': {
      boxShadow: '0 1px 3px silver',
      background: 'rgba(0, 0, 0, .01)'
    }
  },
  td: {
    fontSize: '0.8rem',
    '@media screen and (maxWidth: 700px)': {
      fontSize: '0.4rem',
    }
  },  
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),    
  },
}));


const tdStyles = window.screen.availWidth > 700
  ? ({ 'fontSize': '0.8rem' })
  : (
    window.screen.availWidth > 550
      ? ({ 'fontSize': '0.6rem' })
      : (
        window.screen.availWidth > 400
          ? ({ 'fontSize': '0.45rem', 'padding': '5px' })
          : ({ 'fontSize': '0.2rem', 'padding': '2px' })
      )
  )
const tdImgStyles = window.screen.availWidth > 400
  ? { 'width': '80px' }
  : { 'width': '50px' }

const modalStyle = window.screen.availWidth > 460
? ({ 'top': '10%', 'width': '400px', 'left': 'calc(50% - 200px)' })
: ({ 'top': '5%', 'width': '280px', 'left': 'calc(50% - 140px)' })

const Catalog = ({ goods, isData, setGoods, setIsData }) => {

  const [isRedirect, setIsRedirect] = useState(false)
  const [itemId, setItemId] = useState("")

  const onclick = (id) => {
    setIsRedirect(true)
    setItemId(id)
  }

  const fetchData = () => {
    axios.get('/goods.json').then(response => {
      setGoods(response.data.rows);
      setIsData()
    })
  }
  useEffect(fetchData, []);


  const classes = useStyles();

  //********* Модальное окно ******************/

  
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div  className={classes.paper} style={modalStyle}>
      <Form fetchData={fetchData} handleClose={handleClose} />
    </div>
  );

  /********** Кнопка "Добавить" ****************/

  const fab =
  {
    color: 'primary',
    icon: <AddIcon />,
    label: 'Add',
  }


  return (
    !isData
      ? <Loader />
      : isRedirect

        ? <Redirect to={`/catalog/${itemId}`} />

        : <React.Fragment>
          <CssBaseline />
          <Container>
            <Typography component="h2" className={classes.h2}>Таблица продукции:</Typography>
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell style={tdStyles} align="center">Название</TableCell>
                    <TableCell style={tdStyles} align="center">Производитель</TableCell>
                    <TableCell style={tdStyles} align="center">Количество</TableCell>
                    <TableCell style={tdStyles} align="center">Цена</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    goods.map((item, index) => (
                      <TableRow key={index} onClick={() => onclick(item.id)} className={classes.tableRow}>
                        <TableCell component="th" scope="row"><img style={tdImgStyles} src={item.src ? item.src : "/images/noImage.jpg"} alt={item.title} /></TableCell>
                        <TableCell style={tdStyles}>{item.title}</TableCell>
                        <TableCell style={tdStyles} align="center">{item.vendor}</TableCell>
                        <TableCell style={tdStyles} align="center">{item.pack}</TableCell>
                        <TableCell style={tdStyles} align="center">{item.price}</TableCell>
                      </TableRow>

                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <Fab aria-label={fab.label} className={classes.fab} color={fab.color} onClick={handleOpen}>
              {fab.icon}
            </Fab>
          </Container>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </React.Fragment>
  )
}


function mapStateToProps(state) {
  return {
    goods: state.goods.goods,
    isData: state.goods.isData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGoods: (goods) => dispatch(setGoods(goods)),
    setIsData: () => dispatch(setIsData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)