import React, { Component, Fragment } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

// const useStyles = makeStyles(theme => {
//     paper: {
//         padding: theme.spacing(1)
//     }
// })

function RightPane(props) {
    // const classes = useStyles();

    return (
        <Grid container sm={6} >
            <Grid item sm={12}>
                <Paper elevation={3} style={props.style}>
                    <Typography variant="h4">
                        Daily Dashboard
                    </Typography>
                </Paper>
            </Grid>
            <Grid item sm={12}>
                <Paper elevation={3} style={props.style}>
                    <Typography variant="h4">
                        Data by the Day
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default RightPane;