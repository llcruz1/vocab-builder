import React from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    snackbar: {
        [theme.breakpoints.down('xs')]: {
          bottom: 90,
        },
    },

}));


export default function Snackbar(props){
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setOpenSnackbar(false);
    };

    return (
                <MuiSnackbar 
                    className={classes.snackbar}
                    open={props.openSnackbar} 
                    autoHideDuration={2000} 
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    message={props.msg}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    } 
                />
            );
}