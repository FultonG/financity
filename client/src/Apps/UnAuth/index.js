import React, { useEffect } from 'react';
import SideNav from '../../Components/SideNav';
import Container from '../../Components/Container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import Signup from './Signup';
import Login from './Login';

import componentsIcon from '../../icons/components.svg';
import folderIcon from '../../icons/folder.svg';
import analyticsIcon from '../../icons/analytics.svg';
import settingsIcon from '../../icons/settings.svg';

import AnimatedIcon from "../../Components/AnimatedIcon";

const UnauthorizedApp = () => {
 
  return (
    <Router>
      <Container>
        {/* <SideNav logo={Logo} navItems={NavItems}></SideNav> */}
        <Container width="100%">
        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
        </Switch>
        </Container>
      </Container>
    </Router>
  )
};

const NavItems = [
  {
    text: 'Components',
    link: '/',
    icon: <AnimatedIcon file={componentsIcon} id="components-link" duration={300} />
  },
  {
    text: 'Classes',
    link: '/classes',
    icon: <AnimatedIcon file={folderIcon} id="classes-link" duration={300}/>
  },
  {
    text: 'Analytics',
    link: '/analytics',
    icon: <AnimatedIcon file={analyticsIcon} id="analytics-link" duration={300}/>
  },
  {
    text: 'Settings',
    link: '/settings',
    icon: <AnimatedIcon file={settingsIcon} id="settings-link" duration={300}/>
  }
]
export default UnauthorizedApp;