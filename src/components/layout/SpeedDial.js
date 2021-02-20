import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AddIcon from '@material-ui/icons/Add';
import TranslateIcon from '@material-ui/icons/Translate';

const useStyles = makeStyles((theme) => ({
    
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },

  speedDialAction: {
    //Overriding SpeedDialAction default props (the component doesn't have a "color" props)
    color: theme.palette.secondary.main,
  },
}));


export default function OpenIconSpeedDial(props) {

  const actions = [
    { icon: <AddIcon/>, name: 'Word', function: props.addWord },
    { icon: <TranslateIcon/>, name: 'Language', function: props.addLanguage },
  ];

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        FabProps={{ color: "secondary" }}
        className={classes.speedDial}
        icon={<SpeedDialIcon/>}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            className={classes.speedDialAction}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.function}
            FabProps={{ color: "secondary" }}
          />
        ))}
      </SpeedDial>
    </div>
  );
}