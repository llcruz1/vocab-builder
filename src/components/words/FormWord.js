import React, {useState} from 'react';
import {useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller} from "react-hook-form";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import {addWordServer, updateWordServer, selectWordsById} from './WordsSlice'
import {wordSchema} from './WordSchema';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
          },
        textAlign: 'center'
    },
 
  form: {
    '& > *': {
        margin: theme.spacing(1),
        minWidth: 500,

        [theme.breakpoints.down('md')]: {
            minWidth: 300,
        },
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  formControl: {
    margin: theme.spacing(2),
  },

  buttons: {
    '& > *': {
        margin: theme.spacing(1),
        textAlign: 'center',
        fontWeight: 550,
      },
  }

}));


function FormWord() {

    const word_types = [
        'Noun',
        'Pronoun',
        'Verb',
        'Adjective',
        'Adverb',
        'Preposition',
        'Conjunction',
        'Interjection',
        'Expression',
        'Slang',
      ];
    
    //inicializa o estado com o hook useState
    const history  = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles(); 

    let { id } = useParams();

    const wordFound = useSelector(state => selectWordsById(state, id))
    const { register, handleSubmit, errors, control } = useForm({
        resolver: yupResolver(wordSchema)
    });

    const [wordOnLoad] = useState(
        id ? wordFound ?? wordSchema.cast({}): wordSchema.cast({}));

    const [actionType, ] = useState(
        id  ? wordFound 
                ? 'words/updateWord'
                : 'words/addWord'
            : 'words/addWord');

    function onSubmit(word){
        if(actionType === 'words/addWord'){
            dispatch(addWordServer(word));
        }else{
            dispatch(updateWordServer({...word, id: wordFound.id}));
        }
        
        history.push('/words');
    }    

    return( <>
                <h1>{wordOnLoad.id == null ? "New Vocabulary" : "Edit Vocabulary"}</h1>

                <Grid className={classes.root}>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}  noValidate autoComplete="off" >
                    <TextField 
                        id="word_title" 
                        label="Word" 
                        name="word_title" 
                        defaultValue={wordOnLoad.word_title} 
                        inputRef={register}
                        helperText={errors.word_title?.message} 
                        error={errors.word_title?.message ? true: false}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        color="secondary"
                    />
                    <br/>
                    <TextField 
                        id="word_description" 
                        label="Description" 
                        name="word_description" 
                        defaultValue={wordOnLoad.word_description} 
                        inputRef={register}
                        helperText={errors.word_description?.message} 
                        error={errors.word_description?.message ? true: false}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        multiline
                        rows={3}
                        color="secondary"
                    />
                    <br/>    
                    <TextField 
                        id="word_examples" 
                        label="Examples" 
                        name="word_examples" 
                        defaultValue={wordOnLoad.word_examples} 
                        inputRef={register}
                        helperText={errors.word_examples?.message} 
                        error={errors.word_examples?.message ? true: false}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        multiline
                        rows={3}
                        color="secondary"
                    />
                    <br/>
                    <FormControl 
                        className={classes.formControl}
                        error={Boolean(errors.word_type)}
                    >
                        {/*<InputLabel>Jogadores</InputLabel>*/}
                        <br/>
                        <Controller
                            control={control}
                            name="word_type"
                            defaultValue={wordOnLoad.id == null ? [] : wordOnLoad.word_type}
                            render={({ onChange, value }) => {
                                return (
                                    <TextField
                                        //classes={classes.formControl}
                                        select
                                        label="Word Type"
                                        style = {{width: 250}}
                                        InputLabelProps={{ shrink: true }}
                                        color="secondary"
                                        SelectProps={{
                                            multiple: true,
                                            value: value,
                                            renderValue: (selected) => 
                                                <div className={classes.chips}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} className={classes.chip} />))}
                                                </div>,
                                            onChange: onChange
                                        }}
                                    >
                                        {word_types.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                <Checkbox checked={value.includes(type)} />
                                                <ListItemText primary={type} />
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                );
                            }}
                        />
                    </FormControl>
                    <br/><br/>
                    <Grid className={classes.buttons}> 
                        <Button type="submit" id="salva_word" name="btn_salvar_word" size="small" variant="contained" color="secondary">Save</Button>
                        <Button type="submit" id="cancela_word" name="cancela_word" size="small" variant="contained" onClick={() => { history.push('/words') }}>Cancel</Button>                  
                    </Grid>
                </form>
 
                </Grid>
            </>
        );
}

export default FormWord