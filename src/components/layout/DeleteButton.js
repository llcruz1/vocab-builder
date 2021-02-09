import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

export default function DeleteButton(props) {
 
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
      
    const handleClose = () => {
      setOpen(false);
    };
      
    return (
        <>
            <Tooltip title="Delete" aria-label="delete">         
                <IconButton id={props.id} name={props.name} onClick={handleClickOpen}><DeleteIcon /></IconButton>
            </Tooltip>  
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"><b>{"Delete this item?"}</b></DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.msg}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        <b>Cancel</b>
                    </Button>
                    <Button onClick={() => {props.funcao(props.chave)}} color="secondary" autoFocus>
                        <b>Delete</b>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
