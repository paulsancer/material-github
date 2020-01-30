import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CodeIcon from '@material-ui/icons/Code';
import BugReport from '@material-ui/icons/BugReport';
import SettingsIcon from '@material-ui/icons/Settings';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import StorageIcon from '@material-ui/icons/Storage';
import PersonIcon from '@material-ui/icons/Person';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const a11yProps = index => ({
  id: `nav-tab-${index}`,
  'aria-controls': `nav-tabpanel-${index}`,
});

const LinkTab = props => {
  const history = useHistory();
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
        // eslint-disable-next-line fp/no-mutating-methods
        history.push(`${props.href}`);
      }}
      {...props}
    />
  );
};

LinkTab.propTypes = {
  href: PropTypes.string.isRequired,
};

const LinkTabLabelWithIcon = ({ text, Icon }) => (
  <span style={{ display: 'flex' }}>
    <Icon />
    &nbsp;{text}
  </span>
);
LinkTabLabelWithIcon.propTypes = {
  text: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
};

const getSelectedTabIndex = (urls, location) => {
  if (location.startsWith(urls.issues)) return 1;
  if (location.startsWith(urls.pulls)) return 2;
  if (location.startsWith(urls.settings)) return 3;
  if (location.startsWith(urls.code)) return 0;

  return -1;
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  repoNameBar: {
    padding: '20px 0',
  },
  repoNameIcon: {
    verticalAlign: 'middle',
  },
  tabsAppBarWrapper: {
    backgroundColor: '#303030',
    position: 'sticky',
    top: 0,
    zIndex: 9999,
    boxShadow: '0 4px 2px -2px rgba(0,0,0,0.3)',
  },
  tabsAppBar: {
    backgroundColor: 'transparent',
  },
}));

export default () => {
  const classes = useStyles();

  const history = useHistory();
  const { location } = history;
  const match = useRouteMatch();
  const { url, params } = match;
  const { user, repo } = params;

  const urls = {
    code: url,
    issues: `${url}/issues`,
    pulls: `${url}/pulls`,
    settings: `${url}/settings`,
    userProfile: `${window.location.origin}/${user}`,
  };

  const [selectedTab, setSelectedTabValue] = React.useState(
    getSelectedTabIndex(urls, location.pathname)
  );

  const handleTabChange = (_, value) => {
    setSelectedTabValue(value);
  };

  return (
    <>
      <div className={classes.root}>
        <Container maxWidth="lg">
          <div className={classes.repoNameBar}>
            <Typography variant="body1" component="span">
              <Chip
                avatar={
                  <Avatar
                    alt="Natacha"
                    src="https://avatars3.githubusercontent.com/u/19829269?s=460&v=4"
                  />
                }
                label={user}
                color="secondary"
                component="a"
                href={urls.userProfile}
                clickable
              />{' '}
              /{' '}
              <Chip
                label={repo}
                color="secondary"
                // icon={<StorageIcon />}
                component="a"
                href="#"
                clickable
              />
            </Typography>
          </div>
        </Container>
      </div>
      <div className={classes.tabsAppBarWrapper}>
        <AppBar
          position="sticky"
          color="transparent"
          elevation={0}
          classes={{ root: classes.tabsAppBar }}
        >
          <Container maxWidth="lg">
            <Tabs
              variant="scrollable"
              indicatorColor="primary"
              textColor="primary"
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="nav tabs example"
              className={classes.tabs}
            >
              <LinkTab
                label={
                  <LinkTabLabelWithIcon text="Source Code" Icon={CodeIcon} />
                }
                href={urls.code}
                {...a11yProps(urls.code)}
              />
              <LinkTab
                label={<LinkTabLabelWithIcon text="Issues" Icon={BugReport} />}
                href={urls.issues}
                {...a11yProps(urls.issues)}
              />
              <LinkTab
                label={
                  <LinkTabLabelWithIcon
                    text="Pull Requests"
                    Icon={CallMergeIcon}
                  />
                }
                href={urls.pulls}
                {...a11yProps(urls.pulls)}
              />
              <LinkTab
                label={
                  <LinkTabLabelWithIcon text="Settings" Icon={SettingsIcon} />
                }
                href={urls.settings}
                {...a11yProps(urls.settings)}
              />
            </Tabs>
          </Container>
        </AppBar>
      </div>
    </>
  );
};
