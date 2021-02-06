import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
  
  }));


/**
 * @module words/VisualizarWord
 */

 /**
 * @typedef Word
 * @type {object}
 * @property {string} id - identificador.
 * @property {string} nome - nome do word.
 * @property {date} data_nascimento - data de nascimento do word.
   */

 /**
  * Renderiza a tela com os dados do word selecionado na linha.
 */

 function VisualizarWord() {
    let { id } = useParams();
 
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

export default VisualizarWord;