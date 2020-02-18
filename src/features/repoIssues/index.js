import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import { fetchRepoIssues } from 'features/repoIssues/repoIssuesSlice';
import IssueRow from './IssueRow';

const user = { username: 'paulsancer', avatarUrl: '' };

export default function Issues() {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { isLoading, issues, error } = useSelector(state => state.repoIssues);

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
          <IssueRow
            key={issue.id}
            title={issue.title}
            user={user}
            description={issue.body}
          />
        ))}
    </Container>
  );
}
