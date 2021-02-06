import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import {selectWordsById} from './WordsSlice'
import {wordSchema} from './WordSchema';


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

    form: {
      '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
      },
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
  
  
  function VisualizeDialog(props){
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
          <VisualizeWord {...props} />
        </Dialog>
      </div>
    );
  
  }

 function VisualizeWord(props) {
    let { id } = useParams();
    id = props.id ? props.id : id;
    id = parseInt(id);
 
    const wordFound = useSelector(state => selectWordsById(state, id))

    const [wordOnLoad] = useState(
        id ? wordFound ?? wordSchema.cast({}): wordSchema.cast({}));

    const classes = useStyles(); 

    return( <> 
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                          <h3>{wordOnLoad.word_title}</h3>
                          <hr/>
                          {wordOnLoad.word_type.map((type) => (
                            <div>
                                {type}
                                <br/>
                            </div>
                        ))}
                          <p>{wordOnLoad.word_description}</p>
                          <em className={classes.examples}>{wordOnLoad.word_examples}</em>
                          <br/><br/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>       
            </>
    );
}

export {VisualizeWord, VisualizeDialog};