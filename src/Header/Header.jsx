import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        width: '70px',
        marginRight: '20px'
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        textTransform: "uppercase"
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <NavLink to={'/'}>
                        <img src="/images/4.png" alt="logotip" className={classes.logo} />
                    </NavLink>
                    <Typography variant="h6" className={classes.title}>
                        <NavLink to={'/catalog'} className={classes.link}>
                            Каталог
                        </NavLink>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}