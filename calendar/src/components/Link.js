
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';
import NotConfigLink from './links/NotConfigLink';
import ConfigLink from './links/ConfigLink';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        marginTop: '1vmin'
    },
}));

export default function Link(params) {
    const classes = useStyles();
    const [isConfig, setIsConfig] = useState(false);
    const [id, setId] = useState("");
    const configCallback = (id) => {
        setIsConfig(true);
        setId(id);
    }
    return (
        isConfig ? <ConfigLink name={params.name} id={id}></ConfigLink> : <NotConfigLink name={params.name} configCallback={configCallback}></NotConfigLink>
    )
}