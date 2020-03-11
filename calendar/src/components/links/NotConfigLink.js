import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        marginTop: '1vmin'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    name: {
        padding: 20,
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '100%',
    },
}));

export default function NotConfigLink(params) {
    const classes = useStyles();
    const [values, setValues] = useState({
        AutoLogin: '',
    });
    const handleChange = (event) => {
        setValues({...values, AutoLogin: event.target.value})
    }

    const handleClickAutoLogin = (event) => {
        console.log(values.AutoLogin)
    };

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={3} >
                <Grid item xs={5}>
                    <div className={classes.name}>
                        {params.name}
                    </div>
                </Grid>
                <Grid item xs={7}>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-AutoLogin">Your Epitech Auto-Login</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-AutoLogin"
                            type={'text'}
                            value={values.AutoLogin}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle AutoLogin launch"
                                        onClick={handleClickAutoLogin}
                                        edge="end"
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={180}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    )
}