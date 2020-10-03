import React from 'react';
import Container from '../../Components/Container';
import Card from '../../Components/Card';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { Bold, Text } from '../../Components/Text';
import LearningVector from '../../images/airplane.svg'

const Login = () => {
  return (
    <Container justify="center" align="center">
    <Card height="60%" width="80%" align="normal" justify="flex-start">
      <Container width="40%" direction="column" padding="20px">
        <Container height="50%" direction="column" justify="center">
          <Bold>Welcome back!</Bold>
        </Container>
          <Container as="form" width="100%" direction="column" align="center">
            <Input placeholder="Username"></Input>
            <Input placeholder="Password" type="password"></Input>
            <Input className="selector" as="select">
              <option>Teacher</option>
              <option>Student</option>
            </Input>
            <Button type="submit">Login</Button>
          </Container>
      </Container>
      <Container width="60%" align="baseline" justify="center">
        <img style={{height: "100%"}}src={LearningVector} />
      </Container>
    </Card>
  </Container>
  )
};

export default Login;