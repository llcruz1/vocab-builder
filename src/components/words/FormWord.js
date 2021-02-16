import React, {useState} from 'react';
import {useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller} from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';

import {addWordServer, updateWordServer, selectWordsById} from './WordsSlice'
import {wordSchema} from './WordSchema';
import MainActionButton from '../layout/MainActionButton.js'


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
    },
  },

  formFields: {
    [theme.breakpoints.up('lg')]: {
        minWidth: "50%",
    },

    [theme.breakpoints.down('md')]: {
        minWidth: "95%",
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

  appBar: {
    position: 'relative',
  },

  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

  fabButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  },

}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  
function FormDialog(props){

    const [openExitDialog, setOpenExitDialog] = useState(false);

    const handleOpenExitDialog = () => {
        setOpenExitDialog(true);
    };
    
    const handleCloseExitDialog = () => {
        setOpenExitDialog(false);
    };

    const [formChanged, setFormChanged] = useState(false);

    const isFormChanged = (e) => {
        setFormChanged(e);
    } 

    const classes = useStyles();

    return (
        <div>
        {/*---------------------------------------Confirm Exit Dialog-------------------------------*/}   
        <Dialog open={openExitDialog} onClose={handleCloseExitDialog}>
            <DialogTitle id="alert-dialog-title">
                Lose current input?
            </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Unsaved changes will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseExitDialog} color="secondary">
                        No
                    </Button>
                    <Button onClick={()=>{props.handleClose();handleCloseExitDialog()}} color="secondary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
        </Dialog>
        {/*-----------------------------------------------------------------------------------------*/}
        
        <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton 
                    edge="start" 
                    color="inherit" 
                    onClick={()=>{formChanged ? handleOpenExitDialog() : props.handleClose(); setFormChanged(false)}} 
                    aria-label="close"
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {props.title}
                </Typography>
            </Toolbar>
            </AppBar>
            <FormWord {...props} setFormChange={isFormChanged} />
        </Dialog>
        </div>
    );

}


function FormWord(props) {

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
        'Phrasal Verb',
      ];
    
    const history  = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles(); 

    let { id } = useParams();
    id = props.id ? props.id : id;
  

    const wordFound = useSelector(state => selectWordsById(state, id))
    const { register, handleSubmit, errors, control } = useForm({
        resolver: yupResolver(wordSchema)
    });

    id = parseInt(id);

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
        }
        else if(actionType === 'words/updateWord'){
            dispatch(updateWordServer({...word, id: wordFound.id}));
        }
        if(!props.fromMenu){
            props.handleClose();
        }
        
        history.push('/words');
    }
    

    return( <>  
                <h1> {/*{wordOnLoad.id == null ? "New Vocabulary" : "Edit Vocabulary"}*/} </h1>

                <Grid className={classes.root}>
                <form 
                    className={classes.form} 
                    onSubmit={handleSubmit(onSubmit)} 
                    onChange={()=>{props.setFormChange(true)}}  
                    noValidate autoComplete="off" 
                >
                    <TextField 
                        className={classes.formFields}
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
                        required
                    />
                    <br/>
                    <TextField 
                        className={classes.formFields}
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
                        className={classes.formFields}
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
                        <br/>
                        <Controller
                            control={control}
                            name="word_type"
                            defaultValue={wordOnLoad.id == null ? [] : wordOnLoad.word_type}
                            render={({ onChange, value }) => {
                                return (
                                    <TextField
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

                    <MainActionButton
                        type="submit"
                        title="Save"
                        ariaLabel="save"
                        onClick={()=>{props.setFormChange(false)}}
                        id="salva_word"
                        name="btn_salvar_word"
                        icon={<DoneIcon />}
                    />
                </form>
 
                </Grid>
            </>
        );
}

export {FormWord, FormDialog}