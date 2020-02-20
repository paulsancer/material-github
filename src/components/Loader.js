import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    height: '100%',
    padding: spacing(2),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    margin: 'auto',
    maxWidth: '50%',
    flex: 1,
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress className={{ root: classes.loader }} />
    </div>
  );
};
