import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ComingSoon from 'components/ComingSoon';
import RepoHeader from './RepoHeader';
import Issues from './issues';
// import Layout from './Layout';

const Repo = () => {
  const match = useRouteMatch();
  const { url, path } = match;

  return (
    <>
      <RepoHeader />
      <div id="repo-content-wrapper">
        <Switch>
          <Route exact path={`${path}`} component={ComingSoon} />
          <Route exact path={`${path}/issues`} component={Issues} />
          <Route exact path={`${path}/pulls`} component={ComingSoon} />
          <Route exact path={`${path}/settings`} component={ComingSoon} />
        </Switch>
      </div>
    </>
  );
};

export default Repo;
