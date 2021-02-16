import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({

    root: {
      margin: theme.spacing(2),
    },
  
    appBar: {
        position: 'relative',
    },
  
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      fontWeight: 550,
    },
  
}));
  
const Transition = React.forwardRef(function Transition(props, ref) {
return <Slide direction="up" ref={ref} {...props} />;
});
  

export default function PageDialog(props) {
    const classes = useStyles();

    return (
        <div>
          <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={props.onClickButton} aria-label="close">
                  {props.iconButton}
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  {props.title}
                </Typography>
              </Toolbar>
            </AppBar>
            {props.pageContent}
          </Dialog>
        </div>
    );
}
