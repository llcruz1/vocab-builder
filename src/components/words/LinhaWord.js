import React from 'react';
import {Link} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';

import BotaoExcluir from '../layout/AlertDialog.js'

/**
 * @module words/LinhaWord
 */

 /**
 * @typedef Word
 * @type {object}
 * @property {string} id - identificador.
 * @property {string} nome - nome do word.
  */

 /**
  * Renderiza uma linha na listagem de words. 
  * Cada linha conterá o nome do word, juntamente com os botões para editar e excluir.
  * @param {Word} props.word - Word a ser renderizado na linha.
  */

function LinhaWord(props) {

  if(props != null && props.word != null && props.word.id != null){
      return(
        <>
        <Divider/>
          <ListItem>
            <ListItem>
              <ListItem button component={Link} to = {`/words/visualizar/${props.word.id}`}>
                <ListItemText primary={props.word.word_title}/>
              </ListItem>            
            </ListItem>

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
          </ListItem>
        </>
      );
  }else{
    return(<tr><td colSpan={3}>It wasn't possible to display the vocabulary list.</td></tr>)
  }
}
  
export default LinhaWord;