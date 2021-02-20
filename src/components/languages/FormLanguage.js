import React, {useState} from 'react';
import {useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm} from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DoneIcon from '@material-ui/icons/Done';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {addLanguageServer, updateLanguageServer, selectLanguagesById} from './LanguagesSlice'
import {languageSchema} from './LanguageSchema';
import MainActionButton from '../layout/MainActionButton.js'
import PageDialog from '../layout/PageDialog';
import availableLanguages from './availableLanguages';


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

}));
  
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

    return (
        <>   
        <Dialog open={openExitDialog} onClose={handleCloseExitDialog}>
        {/*------Confirm Exit Dialog--------*/}
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
        
        <PageDialog
            open={props.open} 
            handleClose={props.handleClose}
            onClickButton={()=>{formChanged ? handleOpenExitDialog() : props.handleClose(); setFormChanged(false)}}
            title={props.title}
            iconButton={<ArrowBackIcon />}
            pageContent={<FormLanguage {...props} setFormChange={isFormChanged} />} 
        />
        </>
    );
}

function FormLanguage(props) {
    
    const history  = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles(); 

    let { id } = useParams();
    id = props.id ? props.id : id;
  

    const languageFound = useSelector(state => selectLanguagesById(state, id))
    const { register, handleSubmit, errors} = useForm({
        resolver: yupResolver(languageSchema)
    });

    id = parseInt(id);

    const [languageOnLoad] = useState(
        id ? languageFound ?? languageSchema.cast({}): languageSchema.cast({}));

    const [actionType, ] = useState(
        id  ? languageFound 
                ? 'languages/updateLanguage'
                : 'languages/addLanguage'
            : 'languages/addLanguage');

    function onSubmit(language){
        if(actionType === 'languages/addLanguage'){
            dispatch(addLanguageServer(language));
        }
        else if(actionType === 'languages/updateLanguage'){
            dispatch(updateLanguageServer({...language, id: languageFound.id}));
        }
        if(!props.fromMenu){
            props.handleClose();
        }
        
        history.push('/languages');
    }
    

    return( <>  
                <h1> {/*{languageOnLoad.id == null ? "New Vocabulary" : "Edit Vocabulary"}*/} </h1>

                <Grid className={classes.root}>
                
                <form 
                    className={classes.form} 
                    onSubmit={handleSubmit(onSubmit)} 
                    onChange={()=>{props.setFormChange(true)}}  
                    noValidate autoComplete="off" 
                >
                    <Autocomplete
                        id="language-select"
                        style={{ width: 300 }}
                        options={availableLanguages}
                        getOptionSelected={(option) => option.name === languageOnLoad.language_title}
                        defaultValue={{code: languageOnLoad.language_code, name: languageOnLoad.language_title}}
                        classes={{
                            option: classes.option,
                        }}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(option) => (
                            <React.Fragment>   
                               {option.name}
                            </React.Fragment>
                        )}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            name="language_title" 
                            error={errors.language_title?.message ? true: false}
                            inputRef={register} 
                            label="Choose a language"
                            defaultValue={languageOnLoad.language_title}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            required
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                            />
                        )}
                    />

                    <MainActionButton
                        type="submit"
                        title="Save"
                        ariaLabel="save"
                        onClick={()=>{props.setFormChange(false)}}
                        id="salva_language"
                        name="btn_salvar_language"
                        icon={<DoneIcon />}
                    />
                </form>
 
                </Grid>
            </>
        );
}

export {FormLanguage, FormDialog}



