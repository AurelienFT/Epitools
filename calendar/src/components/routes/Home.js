import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies'
import { useHistory } from "react-router-dom";
import { getDisplayName, tokenValid, getCalendarsNames } from "../../API/API";
import '../../App.css';
import Header from '../Header';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { loadCSS } from 'fg-loadcss';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '../Link'

const ITEM_HEIGHT = 48;

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [displayName, setDisplayName] = useState(0);
  const [calendarsNames, setCalendarsNames] = useState([]);
  const [linksList, setLinksList] = useState([]);
  const [count, setCount] = useState(0);
  const open = Boolean(anchorEl);
  let history = useHistory();
  const classes = useStyles();
  useEffect(() => {

    async function redirect() {
      if (!cookie.load('user')) {
        history.push("/")
        return;
      }
      if (displayName !== 0) {
        return;
      }
      if (!(await tokenValid(cookie.load('user')))) {
        history.push("/")
      }
      let calendarNamesTemp = await getCalendarsNames();
      setCalendarsNames(calendarNamesTemp)
      let displayNameTemp = await getDisplayName(cookie.load('user'));
      setDisplayName(displayNameTemp);
      loadCSS(
        'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
        document.querySelector('#font-awesome-css'),
      );

    }

    redirect()
  });

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = event => {
    setAnchorEl(null);
  };

  const handleClose = event => {
    setAnchorEl(null);
    let value = event.target.getAttribute("value");
    setLinksList(linksList.concat(<Link key={count} name={value}></Link>));
    setCount(count + 1);
  };

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
                {linksList}
              </div>
            </Grid>
            <Grid item xs={3}>
              <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                Add new link
              </Button>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleCloseMenu}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                  },
                }}
              >
                {calendarsNames.map(option => (
                  <MenuItem  value={option} key={option} selected={option === 'Google Calendar'} onClick={handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}