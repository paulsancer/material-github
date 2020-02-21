import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AccessTime from '@material-ui/icons/AccessTime';
import Comment from '@material-ui/icons/Comment';
import moment from 'moment';
import { Chip } from '@material-ui/core';

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
  avatarWrapper: {
    maxWidth: '80px',
    minWidth: '80px',
    textAlign: 'center',
  },
  avatar: { margin: 'auto', width: spacing(5), height: spacing(5) },
  avatarUsername: { marginTop: spacing(1), wordBreak: 'break-all' },
  heading: {
    fontSize: 20,
    marginBottom: 0,
    fontWeight: 'bold',
  },
  headingIssueNumber: {
    color: palette.grey[500],
    fontWeight: 100,
  },
  subheader: {
    // fontSize: 14,
    color: palette.grey[500],
    letterSpacing: '1px',
    marginBottom: 0,
    marginTop: spacing(2),
    '& > svg': {
      verticalAlign: 'middle',
      fontSize: 18,
    },
  },
  vspace: { marginTop: spacing(1) },
  personIcon: { verticalAlign: 'middle' },
}));

const IssueCard = ({
  id,
  number,
  title,
  description,
  user,
  createdAt,
  comments,
  labels,
  className,
}) => {
  const styles = useStyles();

  return (
    <Card className={clsx(styles.card, className)} elevation={0}>
      <div className={styles.avatarWrapper}>
        <Avatar src={user.avatarUrl} className={styles.avatar} />
        <div className={styles.avatarUsername}>{user.username}</div>
      </div>
      <Box>
        <Typography variant="h3" className={styles.heading}>
          <span className={styles.headingIssueNumber}>#{number}</span>
          &nbsp;&nbsp;
          {title}
        </Typography>
        <Typography
          variant="caption"
          component="div"
          className={clsx(styles.vspace, styles.subheader)}
        >
          <AccessTime /> {moment(createdAt).fromNow()}&nbsp;&nbsp;
          <Comment /> {comments}
        </Typography>
        <Typography variant="body1" className={styles.vspace}>
          {description.substring(0, 200)}...
        </Typography>
        {labels &&
          labels.map(({ id: lblId, name, description: desc, color }) => (
            <Chip
              key={lblId}
              label={name}
              size="small"
              variant="outlined"
              color={`#${color}`}
            />
          ))}
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
  createdAt: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
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
