import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TranslateIcon from '@material-ui/icons/Translate';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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


function SettingsDialog(props){
  const classes = useStyles();
  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Settings/>
      </Dialog>
    </div>
  );

}

 function Settings(){

  const classes = useStyles();

    return(
        <>
            <h1> </h1>
            <List className={classes.root}>
                <ListItem>
                    <ListItemIcon>
                        <TranslateIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Language" />

                    <ListItemSecondaryAction>
                        <ListItemText>
                            English
                        </ListItemText>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider/>

            </List>

        </>
    );
 };

export {Settings, SettingsDialog};