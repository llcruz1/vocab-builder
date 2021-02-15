import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LightIcon from '@material-ui/icons/Brightness7';
import DarkIcon from '@material-ui/icons/Brightness4';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  const icon = props.darkState ? <LightIcon />: <DarkIcon />;
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={props.toggleDrawerHandler(true)} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Vocab Builder
          </Typography>
          <Tooltip title="Toggle dark mode">
            <IconButton edge="start" className={classes.menuButton} onClick={props.handleThemeChange} color="inherit" aria-label="toggle dark mode">
                {icon}
            </IconButton>
          </Tooltip>    
        </Toolbar>
      </AppBar>
    </div>
  );
}
