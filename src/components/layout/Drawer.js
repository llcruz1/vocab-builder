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
                    <ListItem button key="Words" onClick={props.toggleDrawerHandler(false)} component={Link} to="/">
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Words" />
                    </ListItem>

                    <Divider/>
                </List>
            </Box>
        </MUIDrawer>
    )

}