import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';

import {deleteWordServer, fetchWords, selectAllWords} from './WordsSlice'
import TabelaWords from './TabelaWords'

/**
 * @module words/ListagemWords
 */

/**
 * Renderiza a tela de Listagem de words.
 * 
 */

function ListagemWord() {

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
  
  
    let tabelaWords = '';
    if(status === 'loaded' || status === 'saved' || status === 'deleted'){
      tabelaWords = <TabelaWords words={words} onClickExcluirWord={handleClickExcluirWord} />;
    }else if(status === 'loading'){
      tabelaWords = <div>Loading...</div>;
    }else if(status === 'failed'){
      tabelaWords = <div>Error: {error}</div>;
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
              {tabelaWords}
            </div>
            </>
    );
  }

  export default ListagemWord