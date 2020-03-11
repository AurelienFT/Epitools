import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import React from 'react';
import '../App.css';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import cookie from 'react-cookies'
import { useHistory } from "react-router-dom";

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

const ITEM_HEIGHT = 48;

export default function Header(params) {
  const [anchorElHeader, setAnchorElHeader] = React.useState(null);
  const open = Boolean(anchorElHeader);
  let history = useHistory();

  const handleClick = event => {
    setAnchorElHeader(event.currentTarget);
  };

  const handleCloseMenu = event => {
    setAnchorElHeader(null);
  };

  const handleClose = event => {
    let evt = event.target.getAttribute("value");
    if (evt === "Disconnect") {
      cookie.remove('user', { path: '/' })
      history.push("/");
    }
    setAnchorElHeader(null);
  };

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Epitools
        </Typography>
        <Button color="inherit"
          onClick={handleClick}
        >
          {params.displayName}
        </Button>
        <Menu
          id="long-menu"
          anchorEl={anchorElHeader}
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
          <MenuItem value={"Disconnect"} key={"Déconnexion"} onClick={handleClose}>
            Déconnexion
                  </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}