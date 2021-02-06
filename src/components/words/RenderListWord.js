import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
//import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';

import DeleteButton from '../layout/DeleteButton.js'
import {VisualizeDialog} from './VisualizeWord';

import {deleteWordServer, fetchWords, selectAllWords} from './WordsSlice'

const useStyles = makeStyles((theme) => ({
  fabButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  },

  messages: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

//----------------------------------Item-----------------------------------------------//
function ItemWord(props) {

  const classes = useStyles();

  let listItemProps = {
    divider: true,
    button: true,
    id: props.word.id,
    onClick: () => props.setEditId(props.word.id)
  }

  if(props != null && props.word != null && props.word.id != null){
      return(
        <>
        <ListItem {...listItemProps}>
          <ListItemText
              primary={props.word.word_title}
          />
          <ListItemSecondaryAction>
            <Link to={`/words/${props.word.id}`}>
                <Tooltip title="Update" aria-label="update">
                  <IconButton id="edita_word" Link to={`/words/${props.word.id}`} >
                    <EditIcon/>
                  </IconButton>
                </Tooltip>
              </Link>
              
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

//--------------------------------------List-----------------------------------------------//
function ListWords(props) {

  const classes = useStyles();

  if(props != null && props.words != null && props.words.length > 0){
    return(
        <Box justifyContent="flex-start">
          <List>
            {props.words.map((word) =>
            <ItemWord 
              key={word.id} 
              word={word} 
              onClickExcluirWord={props.onClickExcluirWord}
              setEditId={props.setEditId}
            />)}                      
          </List>
        </Box>
    );
  }else{
    return(
      <div className={classes.messages}>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        Vocabulary list is empty.
      </div>
    )
  }
}
//------------------------------------------------------------------------------------//


//--------------------------------RenderList-------------------------------------------//
function RenderListWord() {

    const words = useSelector(selectAllWords)
    const status = useSelector(state => state.words.status);
    //const error = useSelector(state => state.words.error);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openVisualizeDialog, setOpenVisualizeDialog] = useState(false);
    const [editId, setEditId] = useState(0);
  
    function handleClickExcluirWord(id){
      dispatch(deleteWordServer(id));
    }

    function handleOpenVisualizeWord(idProjeto){
      setEditId(idProjeto);
      setOpenVisualizeDialog(true);
    }

    function handleCloseVisualizeWord(){
        setOpenVisualizeDialog(false);
    }
  
    useEffect(() => {
      if (status === 'not_loaded' ) {
          dispatch(fetchWords())
      }else if(status === 'failed'){
          setTimeout(()=>dispatch(fetchWords()), 5000);
      }
    }, [status, dispatch])
  
  
    let listWords = '';
    if(status === 'loaded' || status === 'saved' || status === 'deleted'){
      listWords = <ListWords words={words} onClickExcluirWord={handleClickExcluirWord} setEditId={handleOpenVisualizeWord} />;
    }else if(status === 'loading'){
      listWords = <div>Loading...</div>;
    }else if(status === 'failed'){
      listWords = 
        <div className={classes.messages}>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/>
          Can't load content.
        </div>;
    }
  
    return( <>
            <div style={{ width: '100%' }}>
              <Box display="flex" justifyContent="flex-start" >
                <Box>
                  <div id="lbl_titulo_pagina"><h1>Your vocabulary</h1></div>
                </Box>
              </Box>
                {listWords}

                <VisualizeDialog 
                    id={editId} 
                    open={openVisualizeDialog}
                    handleOpen={handleOpenVisualizeWord} 
                    handleClose={handleCloseVisualizeWord} 
                    title="View"
                />

                <Zoom in={true} timeout = {{enter: 500, exit: 500}} unmountOnExit>
                  <Tooltip title="Add vocabulary" aria-label="add">
                    <Fab component={Link} to="/words/novo" className={classes.fabButton} id="novo_word" name="btn_novo_word" color="secondary" aria-label="add">
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