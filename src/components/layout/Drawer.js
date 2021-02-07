import React, {useState} from 'react';
import MUIDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/List';
import {Link} from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';
import {SettingsDialog} from '../settings/settingsPage';


export default function Drawer(props){

    const [openSettingsDialog, setOpenSettingsDialog] = useState(false);

    function handleOpenSettings(){
      setOpenSettingsDialog(true);
    };
      
    function handleCloseSettings(){
      setOpenSettingsDialog(false);
    };

    return(
        <MUIDrawer anchor="left" open={props.open} 
            onOpen={props.toggleDrawerHandler(true)} 
            onClose={props.toggleDrawerHandler(false)} >
            <Box width={250}>
                <List>
                <ListItem button key="Languages" onClick={props.toggleDrawerHandler(false)} component={Link} to="/">
                        <ListItemIcon><ListIcon /></ListItemIcon>
                        <ListItemText primary="Languages" />
                    </ListItem>
                </List>

                <List>
                    <ListItem button key="Browse" onClick={props.toggleDrawerHandler(false)}>
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Browse" />
                    </ListItem>

                    <Divider/>

                    <ListItem button key="Settings" onClick={() => {props.toggleDrawerHandler(false); handleOpenSettings();}}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />

                    </ListItem>
                    <SettingsDialog
                            open={openSettingsDialog}
                            handleOpen={handleOpenSettings}
                            handleClose={handleCloseSettings}
                            title="Settings"
                    />

                    {/*<ListItem button key="Cadastros" onClick={() => {props.toggleDrawerHandler(false);handleClick();}}>
                        <ListItemIcon><FolderIcon /></ListItemIcon>
                        <ListItemText primary="Cadastros" />
                        {open ? <ExpandLess /> : <ExpandMore />}                       
                     </ListItem>

                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button key="Jogadores" className={classes.nested} onClick={props.toggleDrawerHandler(false)} component={Link} to="/jogadores">
                                <ListItemIcon><DirectionsRunIcon /></ListItemIcon>
                                <ListItemText primary="Jogadores" />
                            </ListItem>
                            <ListItem button key="Times" className={classes.nested} onClick={props.toggleDrawerHandler(false)} component={Link} to="/times">
                                <ListItemIcon><BeenhereIcon /></ListItemIcon>
                                <ListItemText primary="Times" />
                            </ListItem>
                            <ListItem button key="ADMs" className={classes.nested} onClick={props.toggleDrawerHandler(false)} component={Link} to="/adms">
                                <ListItemIcon><SupervisorAccountIcon/></ListItemIcon>
                                <ListItemText primary="ADMs" />
                            </ListItem>
                        </List>
                    </Collapse>*/}
                    
                </List>
            </Box>
        </MUIDrawer>
    )

}