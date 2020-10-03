import React, { useEffect } from 'react';
import SideNav from '../../Components/SideNav';
import Container from '../../Components/Container';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import Signup from './Signup';
import Login from './Login';

import ArrowIn from '../../icons/arrow-in.svg';
import Upload from '../../icons/upload.svg';

import AnimatedIcon from "../../Components/AnimatedIcon";

const UnauthorizedApp = () => {
 
  return (
    <Router>
      <Container>
        <SideNav logo={Logo} navItems={NavItems}></SideNav>
        <Container width="100%">
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"/>
          </Route>
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
    text: 'Login',
    link: '/login',
    icon: <AnimatedIcon file={ArrowIn} id="login-link" duration={300} />
  },
  {
    text: 'Signup',
    link: '/signup',
    icon: <AnimatedIcon file={Upload} id="signup-link" duration={300}/>
  }
]
export default UnauthorizedApp;