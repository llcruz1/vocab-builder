import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';


import BotaoExcluir from '../layout/BotaoExcluir.js'

import {deleteWordServer, fetchWords, selectAllWords} from './WordsSlice'

//----------------------------------Item-----------------------------------------------//
function ItemWord(props) {

  let listItemProps = {
    divider: true,
    button: true,
    id: props.word.id,
  }

  if(props != null && props.word != null && props.word.id != null){
      return(
        <>
        <ListItem {...listItemProps} component={Link} to = {`/words/visualizar/${props.word.id}`}>
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
              
              <BotaoExcluir 
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
    return(<tr><td colSpan={3}>It wasn't possible to display the vocabulary list.</td></tr>)
  }
}
//--------------------------------------------------------------------------------------------//

//--------------------------------------List-----------------------------------------------//
function ListWords(props) {
  if(props != null && props.words != null && props.words.length > 0){
    return(
        <Box justifyContent="flex-start">
          <List>
            {props.words.map((word) =><ItemWord key={word.id} word={word} 
                                    onClickExcluirWord={props.onClickExcluirWord}/>)}                      
          </List>
        </Box>
    );
  }else{
    return(<div>There are no items to be displayed.</div>)
  }
}
//------------------------------------------------------------------------------------//


//--------------------------------RenderList-------------------------------------------//
function RenderListWord() {

    const words = useSelector(selectAllWords)
    const status = useSelector(state => state.words.status);
    const error = useSelector(state => state.words.error);
    const dispatch = useDispatch();
  
      
    function handleClickExcluirWord(id){
      dispatch(deleteWordServer(id));
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
      listWords = <ListWords words={words} onClickExcluirWord={handleClickExcluirWord} />;
    }else if(status === 'loading'){
      listWords = <div>Loading...</div>;
    }else if(status === 'failed'){
      listWords = <div>Error: {error}</div>;
    }
  
    return( <>
            <div style={{ width: '100%' }}>
              <Box display="flex" justifyContent="flex-start" >
                <Box>
                  <div id="lbl_titulo_pagina"><h1>Your vocabulary</h1></div>
                </Box>
              </Box>
  
              <Box display="flex" justifyContent="flex-end">
                <Box>
                  <Tooltip title="Add vocabulary" aria-label="add">
                    <IconButton component={Link} to="/words/novo" id="novo_word" name="btn_novo_word"><AddCircleIcon color='secondary' style={{fontSize: 50}}/></IconButton>
                  </Tooltip>
                </Box>
              </Box>
              {listWords}
            </div>
            </>
    );
  }
//-----------------------------------------------------------------------------------------------------//
  export default RenderListWord