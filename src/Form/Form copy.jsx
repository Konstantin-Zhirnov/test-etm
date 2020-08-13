import React, { useState } from 'react'
import axios from '../axios/axioas-etm'
import { useSelector } from 'react-redux'

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    formH1: {
        fontSize: '20px',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            fontSize: '2em',
        },
    },
}));

const Form = ({ fetchData, handleClose }) => {

    const goods = useSelector(state => state.goods.goods)
    const classes = useStyles();

    // const [item_1, setItem_1] = useState('')
    const [item_2, setItem_2] = useState('')
    const [item_3, setItem_3] = useState('')
    const [item_4, setItem_4] = useState('')
    const [item_5, setItem_5] = useState('')
    const [item_6, setItem_6] = useState('')

    const resetValueForm = () => {
        // setItem_1('')
        setItem_2('')
        setItem_3('')
        setItem_4('')
        setItem_5('')
        setItem_6('')
    }


    const imputProps = [
        // { label: "Введите id", type: 'text', onChangeValue: e => { setItem_1(e.target.value) }, value: item_1 },
        { label: "Название: ", type: 'text', onChangeValue: e => { setItem_2(e.target.value) }, value: item_2 },
        { label: "Производитель: ", type: 'text', onChangeValue: e => { setItem_3(e.target.value) }, value: item_3 },
        { label: "Количество: ", type: 'text', onChangeValue: e => { setItem_4(e.target.value) }, value: item_4 },
        { label: "Цена: ", type: 'text', onChangeValue: e => { setItem_5(e.target.value) }, value: item_5 },
        { label: "Ссылка на фото: ", type: 'text', onChangeValue: e => { setItem_6(e.target.value) }, value: item_6 }
    ]

    const submitHandler = event => {
        event.preventDefault()
    }

    const createItem = () => {

        const setRandomId = () => {
            return Math.floor(Math.random() * 100000)
        }

        const rows = [...goods, {
            "id": setRandomId(),
            "title": item_2,
            "vendor": item_3,
            "pack": item_4,
            "price": item_5,
            "src": item_6
        }]
        resetValueForm()
        handleClose()
        axios.put('/goods.json', { rows }).then(() => fetchData())
    }

    return (
        <div >
            <div>
                <h1 className={classes.formH1}>Добавление товара</h1>
                <form onSubmit={submitHandler}>
                    {
                        imputProps.map((item, index) => (<TextField
                            key={index}
                            id="outlined-full-width"
                            label={item.label}
                            onChange={item.onChangeValue}
                            value={item.value}
                            style={{ margin: "20px 0" }}
                            placeholder=""
                            helperText=""
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />))
                    }
                    <Button variant="contained" color="primary" onClick={createItem}>Добавить</Button>
                </form>
            </div>
        </div>
    )
}

export default Form


//**********************

// <input type="file" id="file1" />
// <button onclick="save()">Save</button>
// <img id="image1" width="500px" height="500px" />
// <br>
// <script>

//     function save ()  {
//         let f = file1.files[0];
//         if (f) {
//             image1.src = URL.createObjectURL(f);
//             localStorage.setItem('myImage', image1.src);
//         }
//     }

//     image1.src = localStorage.getItem('myImage')
// </script>
