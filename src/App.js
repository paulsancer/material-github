import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import green from '@material-ui/core/colors/lightGreen';
import grey from '@material-ui/core/colors/grey';

import Repo from 'features/repoDetails';
import ComingSoon from 'components/ComingSoon';
import Header from 'components/layout/Header';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#212121',
      paper: '#303030', // 'rgba(255,255,255, 0.05)',
    },
    primary: green,
    secondary: grey,
  },
});

const useStyles = makeStyles(() => ({
  app: { display: 'flex', flexDirection: 'column', height: '100%' },
}));

const App = () => {
  const { app } = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={app}>
        <Header />
        <Router basename={process.env.REACT_APP_RouterBaseName}>
          <Switch>
            <Route exact path="/:org">
              <ComingSoon />
            </Route>
            <Route path="/:org/:repo">
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
};

export default App;
