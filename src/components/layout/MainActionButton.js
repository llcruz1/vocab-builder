import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
//import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fabButton: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3
    },
}));

export default function MainActionButton(props) {

    const classes = useStyles();

    return (
        <Zoom in={true} timeout = {{enter: 500, exit: 500}} unmountOnExit>
            <Tooltip title={props.title} aria-label={props.ariaLabel}>
                <Fab
                    type={props.type}   
                    onClick={props.onClick} 
                    className={classes.fabButton} 
                    id={props.id} 
                    name={props.name} 
                    color="secondary" 
                    aria-label={props.ariaLabel}
                >
                    {props.icon}
                </Fab>
            </Tooltip>
        </Zoom>
    );

}
