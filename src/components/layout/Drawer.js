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
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme)=>({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
        drawerPaper: {
        width: drawerWidth,
    },

    header: {
        paddingTop: 10,
        paddingLeft: 20,     
    },

    caption: {
        paddingLeft: 20,
    }

}));


export default function Drawer(props){

    const classes = useStyles();

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
                <Box>
                    <div className={classes.toolbar}>
                        <Typography className={classes.header} variant="h6" gutterBottom>
                            Vocab Builder
                        </Typography>
                        <Typography className={classes.caption} variant="caption" display="block" gutterBottom>
                            v0.0.1
                        </Typography>
                    </div>
                    <Divider/>
                </Box>
                <List>
                    <ListItem button key="Languages" onClick={props.toggleDrawerHandler(false)} component={Link} to="/languages">
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="Languages" />
                    </ListItem>
    
                    <ListItem button key="Browse" onClick={props.toggleDrawerHandler(false)} component={Link} to="/">
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