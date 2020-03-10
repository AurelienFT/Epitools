import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies'
import { useHistory } from "react-router-dom";
import { getDisplayName } from "../../API/API"
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const [displayName, setDisplayName] = useState(0);
  let history = useHistory();
  useEffect(() => {
    
    async function redirect() {
      if (!cookie.load('user')) {
        history.push("/")
      }
      let displayNameTemp = await getDisplayName(cookie.load('user'));
      setDisplayName(displayNameTemp);
    }

    redirect()
  });
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          News
    </Typography>
        <Button color="inherit">{displayName}</Button>
      </Toolbar>
    </AppBar>
  );
}