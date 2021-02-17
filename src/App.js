import React, {useState, useEffect} from 'react';
import {store} from './Store';
import {Provider} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme, responsiveFontSizes  } from '@material-ui/core/styles';

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
  const mainPrimaryColor = darkState ? grey[800] : deepPurple[700];
  const mainSecondaryColor = darkState ? deepPurple['A200'] : deepPurple['A200'];
 
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
  

  return( <>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Provider store={store}>                
                <Router>   
                      <div>
                        <Switch>
                          <Route exact path="/"><RenderListWord handleThemeChange={handleThemeChange} darkState={darkState}/></Route>
                          <Route exact path="/words/novo"><FormWord fromMenu={true}/></Route>
                          <Route exact path="/words/:id"><FormWord fromMenu={true}/></Route>
                          <Route exact path="/words/visualize/:id"><VisualizeWord/></Route>
                          <Route exact path="/words"><RenderListWord handleThemeChange={handleThemeChange} darkState={darkState} /></Route>      
                          <Route exact path="/settings" ><Settings/></Route>     
                        </Switch>
                      </div>
                </Router>
              </Provider>
            </ThemeProvider>
          </>
        ); 
}

export default App;
