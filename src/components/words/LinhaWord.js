import React from 'react';
import {Link} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import BotaoExcluir from '../layout/AlertDialog.js'


function LinhaWord(props) {

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


       {/*} <Divider/>
          <ListItem>
            <ListItem>
              <ListItem button >component={Link} to = {`/words/visualizar/${props.word.id}`}
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
      </ListItem>*/}
        </>
      );
  }else{
    return(<tr><td colSpan={3}>It wasn't possible to display the vocabulary list.</td></tr>)
  }
}
  
export default LinhaWord;