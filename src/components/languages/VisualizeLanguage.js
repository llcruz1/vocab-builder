import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {selectLanguagesById} from './LanguagesSlice'
import {languageSchema} from './LanguageSchema';

import PageDialog from '../layout/PageDialog';


const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
      flexGrow: 1,
      textAlign: 'center',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },

    examples: {
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    
}));

  function VisualizeDialog(props){
    return (
      <>
        <PageDialog
          open={props.open} 
          handleClose={props.handleClose}
          onClickButton={props.handleClose}
          title={props.title}
          iconButton={<ArrowBackIcon />}
          pageContent={<VisualizeLanguage {...props}/>} 
        />
      </>
    );
  
  }

 function VisualizeLanguage(props) {
    let { id } = useParams();
    id = props.id ? props.id : id;
    id = parseInt(id);
 
    const languageFound = useSelector(state => selectLanguagesById(state, id))

    const [languageOnLoad] = useState(
        id ? languageFound ?? languageSchema.cast({}): languageSchema.cast({}));

    const classes = useStyles(); 

    return( <> 
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                          <h3>{languageOnLoad.language_title}</h3>
                          <hr/>
                          <br/><br/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>       
            </>
    );
}

export {VisualizeLanguage, VisualizeDialog};