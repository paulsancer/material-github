import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import green from '@material-ui/core/colors/lightGreen';

import Repo from 'components/repo';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#212121',
      paper: 'rgba(255,255,255, 0.05)',
    },
    primary: green,
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/:user/:repo">
            <Repo />
          </Route>
          <Redirect
            push
            to={
              process.env.REACT_APP_DefaultRepository ||
              '/paulsancer/material-github'
            }
          />
        </Switch>
      </Router>
    </div>
  </ThemeProvider>
);

export default App;
