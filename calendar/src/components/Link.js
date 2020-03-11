
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      marginTop: '1vmin'
    },
}));

export default function Link(params) {
    const classes = useStyles();
    return(
    <Paper className={classes.paper}>
      <Grid container spacing={3} >
        <Grid item xs={4}>
          {params.name}
          </Grid>
        <Grid item xs={4}>
          <Grid container spacing={3} >
            <Grid item xs={2}>
              <Icon className="far fa-check-circle" style={{ color: green[500] }} />
            </Grid>
            <Grid item xs={6}>
              Activated
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} style={{ alignItems: "center", textAlign: 'center' }}>
          <Button variant="outlined">Settings</Button>
        </Grid>
      </Grid>
    </Paper>
    )
}