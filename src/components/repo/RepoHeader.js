import React from 'react';
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CodeIcon from '@material-ui/icons/Code';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import CallMergeIcon from '@material-ui/icons/CallMerge';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

TabPanel.defaultProps = {
  children: null,
};

const a11yProps = index => {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
};

const LinkTab = props => {
  const history = useHistory();
  const { location } = history;
  // eslint-disable-next-line react/prop-types
  console.log('IS SELECTED', location.pathname === props.href);
  // eslint-disable-next-line no-debugger
  debugger;
  return (
    <Tab
      component="a"
      // eslint-disable-next-line react/prop-types
      selected={location.pathname === props.href}
      onClick={event => {
        event.preventDefault();
        // eslint-disable-next-line fp/no-mutating-methods
        // eslint-disable-next-line react/prop-types
        history.push(`${props.href}`);
      }}
      {...props}
    />
  );
};

// eslint-disable-next-line react/prop-types
const LinkTabLabelWithIcon = ({ text, Icon }) => (
  <span style={{ display: 'flex' }}>
    <Icon />
    &nbsp;{text}
  </span>
);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const { location } = useHistory();
  console.log(match);
  const { url, path } = match;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div style={{ margin: '5rem' }} />
      <AppBar position="sticky" color="default" elevation={0}>
        <Tabs
          variant="standard"
          indicatorColor="primary"
          textColor="primary"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          centered
        >
          <LinkTab
            label={<LinkTabLabelWithIcon text="Code" Icon={CodeIcon} />}
            href={`${url}`}
            {...a11yProps(0)}
          />
          <LinkTab
            label={
              <LinkTabLabelWithIcon text="Issues" Icon={WarningRoundedIcon} />
            }
            href={`${url}/issues`}
            {...a11yProps(1)}
          />
          <LinkTab
            label={
              <LinkTabLabelWithIcon text="Pull Requests" Icon={CallMergeIcon} />
            }
            href={`${url}/pulls`}
            {...a11yProps(2)}
          />
          <LinkTab
            label={<LinkTabLabelWithIcon text="Settings" Icon={SettingsIcon} />}
            href={`${url}/settings`}
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>
      <Switch>
        <Route
          exact
          path={`${path}`}
          component={() => <TabPanel>code</TabPanel>}
        />
        <Route
          exact
          path={`${path}/issues`}
          component={() => (
            <TabPanel>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
              <p>issues</p>
            </TabPanel>
          )}
        />
        <Route
          exact
          path={`${path}/pulls`}
          component={() => <TabPanel>pull requests</TabPanel>}
        />
        <Route
          exact
          path={`${path}/settings`}
          component={() => <TabPanel>settings</TabPanel>}
        />
      </Switch>
    </div>
  );
};
