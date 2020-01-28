import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  avatarWrapper: {
    display: 'inline-block',
    // width: '80px',
  },
  contentWrapper: {
    display: 'inline-block',
    width: 'auto',
    marginLeft: '1rem',
  },
  flex: { display: 'flex' },
}));

const IssueRow = ({ id, title, description, user, labels }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Card elevation={1}>
        <Box p={2} className={classes.flex}>
          <div className={classes.avatarWrapper}>
            <Avatar />
          </div>
          <div className={classes.contentWrapper}>
            <Typography variant="h6">
              <Typography variant="h6" color="textSecondary" component="span">
                #{id}
              </Typography>{' '}
              {title}
            </Typography>
            <Typography variant="body1">{description}</Typography>
          </div>
        </Box>
      </Card>
    </Box>
  );
};

IssueRow.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  labels: PropTypes.arrayOf({
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

IssueRow.defaultProps = {
  labels: [],
};

export default IssueRow;
