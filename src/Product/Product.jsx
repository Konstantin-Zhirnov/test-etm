import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 100
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


const Product = ({ itemId, goods }) => {

    const classes = useStyles();
        
    const product = goods.filter(item => Number(item.id) === Number(itemId)) 
    

    return (        
        <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} src={product[0].src ? product[0].src : "/images/noImage.jpg"} alt={product[0].title} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    <h3>{product[0].title}</h3>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                  <p><b>Производитель: </b>{product[0].vendor}</p>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                  <p><b>Количество: </b>{product[0].pack}</p>
                  </Typography>
                </Grid>                
              </Grid>
              <Grid item>
                <Typography variant="subtitle1"><p>{product[0].price} &#8381;</p></Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
}


function mapStateToProps(state) {
    return {
        goods: state.goods.goods
    }
}

export default connect(mapStateToProps)(Product)

