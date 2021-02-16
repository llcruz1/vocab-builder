import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TranslateIcon from '@material-ui/icons/Translate';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import PageDialog from '../layout/PageDialog';

const useStyles = makeStyles((theme) => ({

  root: {
    margin: theme.spacing(2),
  },
  
}));


function SettingsDialog(props){
  return (
    <PageDialog
      open={props.open} 
      handleClose={props.handleClose}
      onClickButton={props.handleClose}
      title={props.title}
      iconButton={<ArrowBackIcon />}
      pageContent={<Settings/>} 
    />
  );
}

 function Settings(){

  const classes = useStyles();

    return(
        <>
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