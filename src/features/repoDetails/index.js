import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import ComingSoon from 'components/ComingSoon';
import Loader from 'components/Loader';
import RepoIssues from 'features/repoIssues';
import { fetchRepoDetails } from './repoSlice';
import RepoHeader from './RepoHeader';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '1rem',
  },
  grow: {
    flexGrow: 1,
  },
}));

const Repo = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const { isLoading, openIssuesCount, orgAvatar, openPrs = 0 } = useSelector(
    state => state.repoDetails
  );
  const { path, params } = match;
  const { org, repo } = params;

  useEffect(() => {
    dispatch(fetchRepoDetails(org, repo));
  }, [dispatch, org, repo]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={clsx(classes.root, classes.grow)}>
      <RepoHeader
        org={org}
        repo={repo}
        avatarUrl={orgAvatar}
        openIssuesCount={openIssuesCount}
        openPrs={openPrs}
      />
      <div className={classes.grow}>
        <Switch>
          <Route exact path={path} component={ComingSoon} />
          <Route exact path={`${path}/issues`} component={RepoIssues} />
          <Route exact path={`${path}/pulls`} component={ComingSoon} />
          <Route exact path={`${path}/settings`} component={ComingSoon} />
        </Switch>
      </div>
    </div>
  );
};

export default Repo;
