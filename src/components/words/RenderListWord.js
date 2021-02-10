import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import Divider from '@material-ui/core/Divider';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


import BackdropFunction from '../layout/Backdrop';
import SnackbarFunction from '../layout/Snackbar';
import DeleteButton from '../layout/DeleteButton.js'
import {VisualizeDialog} from './VisualizeWord';
import {FormDialog} from './FormWord';

import {deleteWordServer, fetchWords, selectAllWords, setStatus} from './WordsSlice'

const useStyles = makeStyles((theme) => ({
  fabButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  },

  messages: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

}));


//--------------------------------RenderList-------------------------------------------//
function RenderListWord(props) {

  const status = useSelector(state => state.words.status);
  const error = useSelector(state => state.words.error)
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openVisualizeDialog, setOpenVisualizeDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [editId, setEditId] = useState(0);
  const [visualizeId, setVisualizeId] = useState(0);

  const [msg, setMsg] = useState(props.msg);
  const [openSnackbar, setOpenSnackbar] = useState(props.open);

  //Display messages on Snackbar accordingly with requests' status
  useEffect(() => {
    switch(status){
      case 'failed': 
        setMsg("Can't load content");
        setOpenSnackbar(true);
        break;
      case 'saved':
        setMsg('Word successfully saved');
        setOpenSnackbar(true);
        break;
      case 'deleted':
        setMsg('Word successfully deleted');
        setOpenSnackbar(true);
        break;
      default:
        break;
    }
}, [status, error]);

  //Change state from saved or deleted to loaded then renders List
  useEffect(() => {
    if (status === 'saved' || status === 'deleted'){
        dispatch(setStatus('loaded'));
    }
  }, [status, dispatch]);  

  function handleClickExcluirWord(id){
    dispatch(deleteWordServer(id));
  }

  function handleOpenVisualizeWord(idWord){
    setVisualizeId(idWord);
    setOpenVisualizeDialog(true);
  }

  function handleCloseVisualizeWord(){
      setOpenVisualizeDialog(false);
  }

  function handleOpenFormWord(idWord){
    if (typeof(idWord) != 'number') {      
      idWord=0; // When clicking on Add button, idWord value is "Object object"
    }
    setEditId(idWord);
    setOpenFormDialog(true);
  }

  function handleCloseFormWord(){
      setOpenFormDialog(false);
  }

  useEffect(() => {
    if (status === 'not_loaded' ) {
        dispatch(fetchWords())
    }else if(status === 'failed'){
        setTimeout(()=>dispatch(fetchWords()), 5000);
    }
  }, [status, dispatch])


  return( <>
          <div style={{ width: '100%' }}>
            <Box display="flex" justifyContent="flex-start" >
              <Box>
                <div id="lbl_titulo_pagina"><h1>Your vocabulary</h1></div>
              </Box>
            </Box>

            <ListWords 
              onClickExcluirWord={handleClickExcluirWord} 
              setVisualizeId={handleOpenVisualizeWord} 
              setEditId={handleOpenFormWord} 
            />

              <VisualizeDialog 
                  id={visualizeId} 
                  open={openVisualizeDialog}
                  handleOpen={handleOpenVisualizeWord} 
                  handleClose={handleCloseVisualizeWord} 
                  title="View"
              />

              <FormDialog 
                  id={editId} 
                  open={openFormDialog}
                  handleOpen={handleOpenFormWord} 
                  handleClose={handleCloseFormWord} 
                  title={editId === 0 ? "Add Word" : "Edit Word"}
              />

              <BackdropFunction open={status === 'saving' || status === 'deleting'}/>
              <SnackbarFunction 
                msg={msg} 
                openSnackbar={openSnackbar}  
                setMsg={setMsg} 
                setOpenSnackbar={setOpenSnackbar} 
              />

              <Zoom in={true} timeout = {{enter: 500, exit: 500}} unmountOnExit>
                <Tooltip title="Add vocabulary" aria-label="add">
                  <Fab onClick={handleOpenFormWord} className={classes.fabButton} id="novo_word" name="btn_novo_word" color="secondary" aria-label="add">
                      <AddIcon />
                  </Fab>
                </Tooltip>
              </Zoom>
          </div>
          </>
  );
}
//-----------------------------------------------------------------------------------------------------//
export default RenderListWord

//--------------------------------------List-----------------------------------------------//
function ListWords(props) {

  const words = useSelector(selectAllWords)
  const status = useSelector(state => state.words.status)
  const dispatch = useDispatch()
  const classes = useStyles();

  useEffect(() => {
    if (status === 'not_loaded') {
        dispatch(fetchWords())
    } 
  }, [status, dispatch])

  switch(status){
    case 'loaded': case 'saved': case 'deleting': case 'saving':
      return(
          <Box justifyContent="flex-start">
            <List>
              {words.map((word) =>
              <ItemWord 
                key={word.id} 
                word={word} 
                onClickExcluirWord={props.onClickExcluirWord}
                setVisualizeId={props.setVisualizeId}
                setEditId={props.setEditId}
              />)}                      
            </List>
          </Box>
      );
      case 'loading':   
      return (
        <List id="words">
            <Divider />
            {[1,2,3,4,5].map((item) => <ItemWord loading key={item} />)}
        </List>
        );         
      case 'failed':
      default:
        return(
          <div>
            <Backdrop className={classes.backdrop}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>  
        ) 
  }  

}
//------------------------------------------------------------------------------------//


//----------------------------------Item-----------------------------------------------//
function ItemWord(props) {

  const classes = useStyles();

  let listItemProps = {
    divider: true,
    button: true,
    id: props.key,
    onClick: () => props.setVisualizeId(props.word.id)
  
  }

  if(props != null && props.word != null && props.word.id != null){
      return(
        <>
            <ListItem {...listItemProps}>
              <ListItemText
                  primary={props.word.word_title}
              />
              <ListItemSecondaryAction>
                  <Tooltip title="Edit" aria-label="Edit">
                    <IconButton id="edita_word" onClick = {() => props.setEditId(props.word.id)} >
                      <EditIcon/>
                    </IconButton>
                  </Tooltip>
            
                  <DeleteButton
                    id="deleta_word" 
                    name="excluir_word"
                    msg="You're about to delete the selected vocabulary." 
                    funcao={props.onClickExcluirWord} 
                    chave={props.word.id}
                  />
              </ListItemSecondaryAction>
            </ListItem>
       
        </>
      );
  }else{
    return(
      <div className={classes.messages}>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        Can't display the vocabulary list.
      </div>)
  }
}
//--------------------------------------------------------------------------------------------//
