import React, {useState} from 'react';
import {store} from './Store';
import {Provider} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme, responsiveFontSizes  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from './components/layout/AppBar';
import Drawer from './components/layout/Drawer';

import ListagemWords from './components/words/ListagemWord';
import FormWord from './components/words/FormWord';
import VisualizarWord from './components/words/VisualizarWord';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {deepPurple} from '@material-ui/core/colors';

let theme = createMuiTheme({
 
  palette: {
    primary: {
      main: deepPurple[900],
    },
    secondary: {
      main: deepPurple[800],
    },
  },
});

theme = responsiveFontSizes(theme);


const App = (props) => {
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
                    <AppBar toggleDrawerHandler={toggleDrawerHandler} />
                    <Drawer open={drawerOpen} toggleDrawerHandler={toggleDrawerHandler} />
                    <Container maxWidth="xl">
                      <div>
                        <Switch>
                          <Route exact path="/"><ListagemWords/></Route>
                          <Route exact path="/words/novo"><FormWord/></Route>
                          <Route exact path="/words/:id"><FormWord/></Route>
                          <Route exact path="/words/visualizar/:id"><VisualizarWord/></Route>
                          <Route exact path="/words"><ListagemWords/></Route>             
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
