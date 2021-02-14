import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
            <div onClick={handleClickOpen} id={props.id} name={props.name}>
                Delete   
            </div>           

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete this item?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.msg}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => {props.funcao(props.chave)}} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
