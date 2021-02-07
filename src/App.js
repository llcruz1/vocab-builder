import React, {useState, useEffect} from 'react';
import {store} from './Store';
import {Provider} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme, responsiveFontSizes  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from './components/layout/AppBar';
import Drawer from './components/layout/Drawer';

import RenderListWord from './components/words/RenderListWord';
import {FormWord} from './components/words/FormWord';
import {VisualizeWord} from './components/words/VisualizeWord';

import {Settings} from './components/settings/settingsPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import {grey, deepPurple} from '@material-ui/core/colors';


const App = (props) => {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [darkState, setDarkState] = useState(prefersDarkMode);

  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? grey[800] : deepPurple[600];
  const mainSecondaryColor = darkState ? deepPurple[600] : deepPurple[600];

  const theme = React.useMemo(() => responsiveFontSizes(createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      },
    },
  })), [palletType, mainPrimaryColor, mainSecondaryColor]);

  useEffect(() => setDarkState(prefersDarkMode), [prefersDarkMode]);

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  
  //theme = responsiveFontSizes(theme);
  //estado do drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  //handler de abrir e fechar o drawer
  const toggleDrawerHandler = (open) => (event) => {
    if (event?.type === 'keydown' && (event?.key === 'Tab' || event?.key === 'Shift')) {
        return;
    }
    setDrawerOpen(open);
  };


  return( <>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Provider store={store}>                
                <Router>    
                    <AppBar handleThemeChange={handleThemeChange} darkState={darkState} toggleDrawerHandler={toggleDrawerHandler} />
                    <Drawer open={drawerOpen} toggleDrawerHandler={toggleDrawerHandler} />
                    <Container maxWidth="xl">
                      <div>
                        <Switch>
                          <Route exact path="/"><RenderListWord/></Route>
                          <Route exact path="/words/novo"><FormWord fromMenu={true}/></Route>
                          <Route exact path="/words/:id"><FormWord fromMenu={true}/></Route>
                          <Route exact path="/words/visualize/:id"><VisualizeWord/></Route>
                          <Route exact path="/words"><RenderListWord/></Route>      
                          <Route exact path="/settings" ><Settings/></Route>      
                        </Switch>
                      </div>
                    </Container>
                </Router>
              </Provider>
            </ThemeProvider>
          </>
        ); 
}

export default App;
