import React from 'react';
import MuiBackdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default function Backdrop(props) {
    const classes = useStyles();
    
    return (
        <MuiBackdrop className={classes.backdrop} open={props.open}>
            <CircularProgress color="inherit" />
        </MuiBackdrop>
    );
  }