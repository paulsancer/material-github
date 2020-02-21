import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import { fetchRepoIssues } from 'features/repoIssues/repoIssuesSlice';
import Loader from 'components/Loader';
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
    return <Loader />;
  }

  return (
    <Slide direction="up" in>
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
              createdAt={issue.created_at}
              comments={issue.comments}
              labels={issue.labels}
            />
          ))}
      </Container>
    </Slide>
  );
}
