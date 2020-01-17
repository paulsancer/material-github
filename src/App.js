import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// import Counter from 'components/Counter';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import green from '@material-ui/core/colors/lightGreen';

import Repo from 'components/repo';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#212121',
      paper: '#333',
    },
    primary: green,
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
      {/* <Counter /> */}
      <Router>
        <Switch>
          <Route path="/:user/:repo">
            <Repo />
          </Route>
          <Redirect push to="/" />
        </Switch>
      </Router>
    </div>
  </ThemeProvider>
);

export default App;
