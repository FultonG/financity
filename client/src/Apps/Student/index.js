import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from '../../Components/Container';
import SideNav from '../../Components/SideNav'
import Logo from '../../images/logo.svg';
import StudentDashboard from './Dashboard';
import componentsIcon from '../../icons/components.svg';
import folderIcon from '../../icons/folder.svg';
import settingsIcon from '../../icons/settings.svg';
import questionsIcon from '../../icons/question.svg';
import house from '../../icons/house.svg';
import analyticsIcon from '../../icons/analytics.svg';
import AnimatedIcon from '../../Components/AnimatedIcon'
import Careers from './Careers';
import RealEstate from './RealEstate';
import Stocks from './Stocks';

import Questions from './Questions';
const StudentApp = (props) => {
  return (
    <Router>
      <Container>
        <SideNav logo={Logo} navItems={NavItems}></SideNav>
        <Container width="85%">
          <Switch>
            <Route exact path="/">
              <StudentDashboard {...props}/>
            </Route>
            <Route exact path="/careers">
              <Careers {...props} />
            </Route>
            <Route exact path="/real_estate">
              <RealEstate {...props} />
            </Route>
            <Route exact path="/stocks">
              <Stocks {...props}/>
            </Route>
            <Route exact path="/questions">
              <Questions {...props}/>
            </Route>
            <Route >
              <Redirect to="/" />
            </Route>
          </Switch>
        </Container>
      </Container>
    </Router>
  )
}

const NavItems = [
  {
    text: 'Dashboard',
    link: '/',
    icon: <AnimatedIcon file={componentsIcon} id="components-link" duration={300} />
  },
  {
    text: 'Careers',
    link: '/careers',
    icon: <AnimatedIcon file={folderIcon} id="careers-link" duration={300} />
  },
  {
    text: 'Real Estate',
    link: '/real_estate',
    icon: <AnimatedIcon file={house} id="real-estate-link" duration={300} />
  },
  {
    text: 'Stocks',
    link: '/stocks',
    icon: <AnimatedIcon file={analyticsIcon} id="stocks-link" duration={300} />
  },
  {
    text: 'Questions',
    link: '/questions',
    icon: <AnimatedIcon file={questionsIcon} id="questions-link" duration={300} />
  },
  {
    text: 'Settings',
    link: '/settings',
    icon: <AnimatedIcon file={settingsIcon} id="settings-link" duration={300} />
  }
]
export default StudentApp;