import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ComingSoon from 'components/ComingSoon';
import RepoIssues from 'features/repoIssues';
import { fetchRepoDetails } from './repoSlice';
import RepoHeader from './RepoHeader';

const Repo = () => {
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
    return <span>Loading...</span>;
  }

  return (
    <>
      <RepoHeader
        org={org}
        repo={repo}
        avatarUrl={orgAvatar}
        openIssuesCount={openIssuesCount}
        openPrs={openPrs}
      />
      <div id="repo-content-wrapper">
        <Switch>
          <Route exact path={path} component={ComingSoon} />
          <Route exact path={`${path}/issues`} component={RepoIssues} />
          <Route exact path={`${path}/pulls`} component={ComingSoon} />
          <Route exact path={`${path}/settings`} component={ComingSoon} />
        </Switch>
      </div>
    </>
  );
};

export default Repo;
