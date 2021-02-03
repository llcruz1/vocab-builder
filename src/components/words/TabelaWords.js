import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';

import LinhaWord from './LinhaWord';

/**
 * @module words/TabelaWords
 */

/**
 * Renderiza a tabela de words.
 * 
 * @param {object} props.words - Lista de words para ser exibida na tabela.
 * 
 */

 function TabelaWords(props) {
  if(props != null && props.words != null && props.words.length > 0){
    return(
        <Box justifyContent="flex-start">
          <List>
            {props.words.map((word) =><LinhaWord key={word.id} word={word} 
                                    onClickExcluirWord={props.onClickExcluirWord}/>)}                      
          </List>
        </Box>
    );
  }else{
    return(<div>There are no items to be displayed.</div>)
  }
}

export default TabelaWords