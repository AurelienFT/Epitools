import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        marginTop: '1vmin'
    },
}));

export default function NotConfigLink(params) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Grid container spacing={3} >
                <Grid item xs={4}>
                    {params.name}
                </Grid>
            </Grid>
        </Paper>
    )
}