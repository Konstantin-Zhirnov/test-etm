import React, { useState, useEffect } from 'react';
import AddProductForm from '../Form/Form'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../UI/Loader/Loader'
import { fetchDataThunkCreator } from '../store/actions/goods'
import cn from 'classnames'

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



const useStyles = makeStyles(theme => ({
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
  tdStyles: {
    fontSize: '0.2rem',
    padding: '2px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.8rem',
      padding: '5px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
      padding: '10px'
    },
  },
  tdImgStyles: {
    width: '50px',
    [theme.breakpoints.up('sm')]: {
      width: '80px',
    },
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
  modalStyle: {
    top: '5%',
    width: '280px',
    left: 'calc(50% - 140px)',
    [theme.breakpoints.up('sm')]: {
      top: '10%',
      width: '400px',
      left: 'calc(50% - 200px)'
    },
  }
}));


const Catalog = ({ history }) => {

  const goods = useSelector(state => state.goods.goods)
  const isData = useSelector(state => state.goods.isData)
  const dispatch = useDispatch()
  const fetchData = () => dispatch(fetchDataThunkCreator())

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
    <div className={cn(classes.paper, classes.modalStyle)}>
      <AddProductForm fetchData={fetchData} handleClose={handleClose} />
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
      : <React.Fragment>
        <CssBaseline />
        <Container>
          <Typography component="h2" className={classes.h2}>Таблица продукции:</Typography>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell className={classes.tdStyles} align="center">Название</TableCell>
                  <TableCell className={classes.tdStyles} align="center">Производитель</TableCell>
                  <TableCell className={classes.tdStyles} align="center">Количество</TableCell>
                  <TableCell className={classes.tdStyles} align="center">Цена</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  goods.map((item, index) => (
                    <TableRow key={index} onClick={() => history.push(`/catalog/${item.id}`)} className={classes.tableRow}>
                      <TableCell component="th" scope="row"><img className={classes.tdImgStyles} src={item.src ? item.src : "/images/noImage.jpg"} alt={item.title} /></TableCell>
                      <TableCell className={classes.tdStyles}>{item.title}</TableCell>
                      <TableCell className={classes.tdStyles} align="center">{item.vendor}</TableCell>
                      <TableCell className={classes.tdStyles} align="center">{item.pack}</TableCell>
                      <TableCell className={classes.tdStyles} align="center">{item.price}</TableCell>
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

export default Catalog