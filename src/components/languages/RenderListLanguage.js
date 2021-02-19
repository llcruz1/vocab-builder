import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';

import Backdrop from '../layout/Backdrop';
import Snackbar from '../layout/Snackbar';
import DeleteButton from '../layout/DeleteButton.js'
import MainActionButton from '../layout/MainActionButton.js'
import {VisualizeDialog} from './VisualizeLanguage';
import {FormDialog} from './FormLanguage';
import AppBar from '../layout/AppBar';
import Drawer from '../layout/Drawer';

import {deleteLanguageServer, fetchLanguages, selectAllLanguages, setStatus} from './LanguagesSlice';



function RenderListLanguage(props) {
  //Renders the main page of the application and calls the ListLanguages component
  const status = useSelector(state => state.languages.status);
  const error = useSelector(state => state.languages.error)
  const dispatch = useDispatch();
  const [openVisualizeDialog, setOpenVisualizeDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [editId, setEditId] = useState(0);
  const [visualizeId, setVisualizeId] = useState(0);
  const [msg, setMsg] = useState(props.msg);
  const [openSnackbar, setOpenSnackbar] = useState(props.open);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawerHandler = (open) => (event) => {
    if (event?.type === 'keydown' && (event?.key === 'Tab' || event?.key === 'Shift')) {
        return;
    }
    setDrawerOpen(open);
  };
 
  function handleClickDeleteLanguage(id){
    dispatch(deleteLanguageServer(id));
  }

  function handleOpenVisualizeLanguage(idLanguage){
    setVisualizeId(idLanguage);
    setOpenVisualizeDialog(true);
  }

  function handleCloseVisualizeLanguage(){
      setOpenVisualizeDialog(false);
  }

  function handleOpenFormLanguage(idLanguage){
    if (typeof(idLanguage) != 'number') {      
      // When clicking on Add button, idLanguage value is "Object object"
      idLanguage=0;
    }
    setEditId(idLanguage);
    setOpenFormDialog(true);
  }

  function handleCloseFormLanguage(){
      setOpenFormDialog(false);
  }

  useEffect(() => {
    //Change state from saved or deleted to loaded, then renders List
    if (status === 'saved' || status === 'deleted'){
        dispatch(setStatus('loaded'));
    }
  }, [status, dispatch]);

  useEffect(() => {
    //Try to fetch languages if failed or not loaded.
    if (status === 'not_loaded' ) {
        dispatch(fetchLanguages())
    }else if(status === 'failed'){
        setTimeout(()=>dispatch(fetchLanguages()), 5000);
    }
  }, [status, dispatch])

  useEffect(() => {
    //Display messages on Snackbar accordingly with requests' status
    switch(status){
      case 'failed': 
        setMsg("Can't load content");
        setOpenSnackbar(true);
        break;
      case 'saved':
        setMsg('Language successfully saved');
        setOpenSnackbar(true);
        break;
      case 'deleted':
        setMsg('Language successfully deleted');
        setOpenSnackbar(true);
        break;
      default:
        break;
    }
  }, [status, error]);

  const [search, setSearch] = useState("");

  return( <>

          <AppBar 
            toggleDrawerHandler={toggleDrawerHandler}
            function={(e) => setSearch(e.target.value)}
            handleThemeChange={props.handleThemeChange} 
            darkState={props.darkState}
            searchMessage="Search Language..."
          />
          <Drawer open={drawerOpen} toggleDrawerHandler={toggleDrawerHandler} />

          <div style={{ width: '100%' }}>
            <Box m={1} display="flex" justifyContent="flex-start" >
              <Typography variant="h4">
                
              </Typography>
            </Box>

            <ListLanguages 
              onClickDeleteLanguage={handleClickDeleteLanguage} 
              setVisualizeId={handleOpenVisualizeLanguage} 
              setEditId={handleOpenFormLanguage} 
              search={search}
            />

            <VisualizeDialog 
                id={visualizeId} 
                open={openVisualizeDialog}
                handleOpen={handleOpenVisualizeLanguage} 
                handleClose={handleCloseVisualizeLanguage} 
                title="View"
            />

            <FormDialog 
                id={editId} 
                open={openFormDialog}
                handleOpen={handleOpenFormLanguage} 
                handleClose={handleCloseFormLanguage} 
                title={editId === 0 ? "Add Language" : "Edit Language"}
            />

            <Backdrop 
              open={status === 'saving' || status === 'deleting'}
            />

            <Snackbar
              msg={msg} 
              openSnackbar={openSnackbar}  
              setMsg={setMsg} 
              setOpenSnackbar={setOpenSnackbar} 
            />

            <MainActionButton
              title="Add Language"
              ariaLabel="add"
              onClick={handleOpenFormLanguage}
              id="novo_language"
              name="btn_novo_language"
              icon={<AddIcon />}
            />
          </div>
          </>
  );
}

function ListLanguages(props) {
  //Fetches languages, allows user to filter them through SearchBar and maps them in the ItemLanguage component
  const languages = useSelector(selectAllLanguages)
  const status = useSelector(state => state.languages.status)
  const dispatch = useDispatch()

  const [filteredLanguages, setFilteredLanguages] = useState([]);

  useEffect(() => {
    //Filter language title that starts with user input
    setFilteredLanguages(
      languages.filter((language) =>
        language.language_title.toLowerCase().startsWith(props.search.toLowerCase())
      )
    );
  }, [props.search, languages]);

  useEffect(() => {
    //Try to fetch if not loaded
    if (status === 'not_loaded') {
        dispatch(fetchLanguages())
    } 
  }, [status, dispatch])

  switch(status){
    case 'loaded': case 'saved': case 'deleting': case 'saving':
      return(
          <Box justifyContent="flex-start">

          {/*<SearchBar
            function={(e) => setSearch(e.target.value)}
          />*/}

          <List>
            {filteredLanguages.map((language) =>
            <ItemLanguage 
              key={language.id} 
              language={language} 
              onClickDeleteLanguage={props.onClickDeleteLanguage}
              setVisualizeId={props.setVisualizeId}
              setEditId={props.setEditId}
            />)}                      
          </List>
          </Box>
      );
      case 'loading':   
      return (
        <List id="languages">
            <Divider />
            {/* This will show 5 Skeleton lines while loading content*/}
            {[1,2,3,4,5].map((item) => <ItemLanguage loading key={item} />)}
        </List>
        );         
      case 'failed':
      default:
        return(
          <div>
            <List id="languages">
                {[1,2,3,4,5].map((item) => <ItemLanguage loading key={item} />)}
            </List>
          </div>  
        ) 
  }  

}

function ItemLanguage(props) {
  //Renders language title and buttons in a ListItem component
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  let listItemProps =  props.loading ? 
  {
    divider: true
  }
  :
  {
    divider: true,
    button: true,
    id: props.key,
    onClick: () => props.setVisualizeId(props.language.id)
  };

  return( 
    <ListItem {...listItemProps}>
      {props.loading ?
        <ListItemText>
          <Skeleton variant="text" width={100} />
        </ListItemText>
      :   
        <ListItemText
            primary={props.language.language_title}
        />
      }

      {props.loading ?
        <ListItemSecondaryAction>
          <Skeleton variant="circle" width={20} height={20} />
        </ListItemSecondaryAction>
      :
        <ListItemSecondaryAction>
            <Tooltip title="Show options" aria-label="show options">
              <IconButton
                aria-label="show menu"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MoreVertIcon/>
              </IconButton>
            </Tooltip>

            <Menu
              id="menu"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleCloseMenu}
            >

              <MenuItem onClick={()=> {handleCloseMenu();props.setEditId(props.language.id)}}>       
                Edit
              </MenuItem>

              <MenuItem onClick={handleCloseMenu}>
                <DeleteButton
                  id="deleta_language" 
                  name="excluir_language"
                  msg="You're about to delete this language." 
                  function={props.onClickDeleteLanguage} 
                  parameter={props.language.id}
                />
              </MenuItem>
            </Menu>
        </ListItemSecondaryAction>
      }  
    </ListItem>
  );
}

export default RenderListLanguage