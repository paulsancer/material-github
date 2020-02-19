import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    marginTop: spacing(2),
    display: 'flex',
    padding: spacing(2),
    minWidth: 288,
    borderRadius: 12,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    '& > *:nth-child(1)': {
      marginRight: spacing(2),
    },
    '& > *:nth-child(2)': {
      flex: 'auto',
    },
  },
  avatar: {},
  heading: {
    fontSize: 20,
    marginBottom: 0,
    fontWeight: 'bold',
  },
  headingIssueNumber: {
    color: palette.grey[500],
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    letterSpacing: '1px',
    marginBottom: 4,
    marginTop: 4,
  },
  value: {
    marginLeft: 8,
    fontSize: 14,
    color: palette.grey[500],
  },
}));

const IssueCard = ({
  id,
  number,
  title,
  description,
  user,
  labels,
  className,
}) => {
  const styles = useStyles();
  return (
    <Card className={cx(styles.card, className)} elevation={0}>
      <Avatar src={user.avatarUrl} className={styles.avatar} />
      <Box>
        <Typography variant="h3" className={styles.heading}>
          {title} <span className={styles.headingIssueNumber}>#{number}</span>
        </Typography>
        <p className={styles.subheader}>Opened by {user.username}</p>
        <Box display="flex" alignItems="center">
          <Typography variant="body1">
            {description.substring(0, 200)}...
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

IssueCard.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};

IssueCard.defaultProps = {
  className: '',
  labels: [],
};

export default IssueCard;
