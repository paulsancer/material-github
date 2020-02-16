import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ComingSoonImage from 'images/under-construction.png';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  imageWrapper: {
    width: '100%',
    textAlign: 'center',
  },
  comingSoonImage: {
    display: 'block',
    width: '80%',
    maxWidth: '300px',
    margin: 'auto',
  },
});

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.imageWrapper}>
      <img
        src={ComingSoonImage}
        alt="Coming soon"
        className={classes.comingSoonImage}
      />
      <Typography variant="body1">
        <Typography variant="h5">Wanna help?</Typography>
        Feel free to contribute on{' '}
        <Link
          href="https://github.com/paulsancer/material-github"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </Link>
        .
      </Typography>
    </div>
  );
};
