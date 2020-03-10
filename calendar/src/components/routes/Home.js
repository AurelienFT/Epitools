import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies'
import { useHistory } from "react-router-dom";
import { getDisplayName, tokenValid } from "../../API/API";
import '../../App.css';
import Header from '../Header';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginTop: '1vmin'
  },
  gridCard: {
    marginTop: '7vmin'
  },
  cardContainer: {
    marginTop: '8vmin',
    fontSize: '20px'
  }
}));


export default function Home() {
  const [displayName, setDisplayName] = useState(0);
  let history = useHistory();
  useEffect(() => {

    async function redirect() {
      if (!cookie.load('user')) {
        history.push("/")
      }
      if (!(await tokenValid(cookie.load('user')))) {
        history.push("/")
      }
      let displayNameTemp = await getDisplayName(cookie.load('user'));
      setDisplayName(displayNameTemp);
      loadCSS(
        'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
        document.querySelector('#font-awesome-css'),
      );
    }

    redirect()
  });
  const classes = useStyles();
  return (
    <div>
      <Header displayName={displayName}></Header>
      <div className={classes.root}>
        <div className="home">
          <Grid container spacing={3} className={classes.gridCard}>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.cardContainer}>
                <Paper className={classes.paper}>
                  <Grid container spacing={3} >
                    <Grid item xs={4}>
                      Google Calendar
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
                    <Grid item xs={4} style={{alignItems: "center", textAlign: 'center'}}>
                    <Button variant="outlined">Settings</Button>
                    </Grid>
                  </Grid>
                </Paper>
                <Paper className={classes.paper}>
                  <Grid container spacing={3} >
                    <Grid item xs={4}>
                      iCal
                      </Grid>
                    <Grid item xs={4}>
                      <Grid container spacing={3} >
                        <Grid item xs={2}>
                          <Icon className="far fa-check-circle" style={{ color: green[500] }} />
                        </Grid>
                        <Grid item xs={10}>
                          Activated
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4} style={{alignItems: "center", textAlign: 'center'}}>
                    <Button variant="outlined">Settings</Button>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="primary">
                Add new link
            </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}