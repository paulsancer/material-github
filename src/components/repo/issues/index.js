import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import IssueRow from './IssueRow';

export default function Issues() {
  return (
    <Container>
      <IssueRow
        id={1}
        title="I am tired of lorem ipsum"
        description="but lorem ipsum est a simply dummy text for filling out spacesbut lorem ipsum est a simply dummy text for filling out spacesbut lorem ipsum est a simply dummy text for filling out spacesbut lorem ipsum est a simply dummy text for filling out spacesbut lorem ipsum est a simply dummy text for filling out spacesbut lorem ipsum est a simply dummy text for filling out spaces"
      />
      <IssueRow
        id={2}
        title="I am tired of lorem ipsum"
        description="but lorem ipsum est a simply dummy text for filling out spaces"
      />
    </Container>
  );
}
