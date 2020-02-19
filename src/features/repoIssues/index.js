import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import { fetchRepoIssues } from 'features/repoIssues/repoIssuesSlice';
import IssueCard from './IssueRow';

export default function Issues() {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const [page] = useState(1);
  const { isLoading, issues } = useSelector(state => state.repoIssues);

  const { params } = match;
  const { org, repo } = params;

  useEffect(() => {
    dispatch(fetchRepoIssues(org, repo, page));
  }, [dispatch, org, page, repo]);

  if (isLoading) {
    return <span>Loading issues...</span>;
  }

  return (
    <Container>
      {issues &&
        issues.map(issue => (
          <IssueCard
            key={issue.id}
            id={issue.number}
            number={issue.number}
            title={issue.title}
            user={{
              username: issue.user.login,
              avatarUrl: issue.user.avatar_url,
            }}
            description={issue.body}
          />
        ))}
    </Container>
  );
}
