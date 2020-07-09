import React, { useState, useEffect } from 'react';
import Form from '../Form/Form'
import { connect } from 'react-redux'
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
import { Redirect } from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Loader from '../UI/Loader/Loader'
import Modal from '@material-ui/core/Modal';
import { setGoods, setIsData } from '../store/actions/goods'
import axios from '../axios/axioas-etm'


function getModalStyle() {  

  return {
    top: `10%`,
    left: `calc(50% - 200px)`,
  };
}

const useStyles = makeStyles((theme) => ({
  h2: {
    fontSize: 'calc(18px + 2vw)',
    textAlign: 'center',
    marginTop: '50px'
  },
  tableContainer: {
    margin: "50px 0 100px",
  },
  table: {
    minWidth: 650
  },
  tableRow: {
    cursor: "pointer",
    '&:hover': {
        boxShadow: '0 1px 3px silver',
        background: 'rgba(0, 0, 0, .01)'
    }
  }, 
  img: {
    width: '80px'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Catalog = ({ goods, isData, setGoods, setIsData }) => {

  const fetchData = () => {
    axios.get('/goods.json').then(response => {
      setGoods(response.data.rows);
      setIsData()
    })
  }

  useEffect(fetchData, []);

  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Form fetchData={fetchData} handleClose={handleClose} />
    </div>
  );

  const fab =
  {
    color: 'primary',
    icon: <AddIcon />,
    label: 'Add',
  }

  const [isRedirect, setIsRedirect] = useState(false)
  const [itemId, setItemId] = useState("")

  const onclick = (id) => {
    setIsRedirect(true)
    setItemId(id)
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
                    <TableCell>Изображение</TableCell>
                    <TableCell align="right">Название</TableCell>
                    <TableCell align="right">Производитель</TableCell>
                    <TableCell align="right">Количество</TableCell>
                    <TableCell align="right">Цена</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    goods.map((item, index) => (
                      <TableRow key={index} onClick={() => onclick(item.id)} className={classes.tableRow}>
                        <TableCell component="th" scope="row"><img className={classes.img} src={item.src ? item.src : "/images/noImage.jpg"} alt={item.title} /></TableCell>
                        <TableCell align="right">{item.title}</TableCell>
                        <TableCell align="right">{item.vendor}</TableCell>
                        <TableCell align="right">{item.pack}</TableCell>
                        <TableCell align="right">{item.price}</TableCell>
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