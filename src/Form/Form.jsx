import React from 'react'
import axios from '../axios/axioas-etm'
import { useSelector } from 'react-redux'
import * as Yup from "yup";

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    formH1: {
        fontSize: '20px',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            fontSize: '2em',
        },
    },
    input: {
        marginTop: "10px",
        width: "100%"
    },
    button: {
        marginTop: "20px"
    }
}));

const AddProductForm = ({ fetchData, handleClose }) => {

    const goods = useSelector(state => state.goods.goods)
    const classes = useStyles();

    const imputProps = [
        { name: "title", label: "Название: ", type: 'text' },
        { name: "vendor", label: "Производитель: ", type: 'text' },
        { name: "pack", label: "Количество: ", type: 'number' },
        { name: "price", label: "Цена: ", type: 'text' },
        { name: "src", label: "Ссылка на фото: ", type: 'text' }
    ]

    const createItem = (values) => {

        const setRandomId = () => {
            return Math.floor(Math.random() * 100000)
        }

        const rows = [...goods, {
            "id": setRandomId(),
            ...values
        }]
        handleClose()
        axios.put('/goods.json', { rows }).then(() => fetchData())
    }

    const FormSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, "минимальная длина - 2 символа")
            .required("Поле обязательное для заполнения"),
        vendor: Yup.string()
            .min(2, "минимальная длина - 2 символа")
            .required("Поле обязательное для заполнения"),
        pack: Yup.number()
            .required("Поле обязательное для заполнения"),
        price: Yup.number()
            .required("Поле обязательное для заполнения")
    });

    return (
        <>
            <h1 className={classes.formH1}>Добавление товара</h1>
            <Formik
                initialValues={{
                    title: '',
                    vendor: '',
                    pack: null,
                    price: '',
                    src: '',
                }}
                validationSchema={FormSchema}
                validate={values => { }}
                onSubmit={(values) => {
                    createItem(values)
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        {
                            imputProps.map((item, index) => (<Field
                                component={TextField}
                                name={item.name}
                                type={item.type}
                                label={item.label}
                                key={index}
                                className={classes.input}
                            />))
                        }
                        {isSubmitting && <LinearProgress />}
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >Добавить</Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default AddProductForm


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
