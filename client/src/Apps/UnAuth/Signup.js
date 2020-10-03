import React, { useState } from 'react';
import Container from '../../Components/Container';
import Card from '../../Components/Card';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { Bold, Text } from '../../Components/Text';
import LearningVector from '../../images/signup.svg'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from "styled-components";

const initialSignup = {
  first_name: '',
  last_name: '',
  username: '',
  password: '',
  classroom_id: '',
  customer: {
    city: '',
    street_name: '',
    street_number: '',
    state: '',
    zip: ''
  }
}

const FadeTransition = styled(CSSTransition)`
  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }
`
const Signup = () => {
  const [type, setType] = useState('student');
  const [data, setData] = useState(initialSignup);
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (val, attr, inner = false) => {
    if (inner) {
      return setData(old => ({ ...old, customer: { ...old.customer, [attr]: val } }));
    }
    return setData(old => ({ ...old, [attr]: val }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (type === 'student') {
      const { customer, ...obj } = data;
    } else {
      const {classroom_id, ...obj} = data;
    }
  }

  return (
    <Container justify="center" align="center">
      <Card width="80%" align="normal" justify="flex-start">
        <Container width="50%" direction="column" padding="20px">
          <Container height="50%" direction="column" justify="center" margin="20px 0px">
            <Bold>Hello!</Bold>
            <Bold>Welcome to Financity.</Bold>
          </Container>
          <Container as="form" width="100%" direction="column" align="center" onSubmit={handleSubmit}>
            <Input as="select" className="selector" value={type} onChange={(e) => setType(e.currentTarget.value)}>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </Input>
            <Input placeholder="First Name" value={data.first_name} onChange={(e) => handleChange(e.currentTarget.value, 'first_name')}></Input>
            <Input placeholder="Last Name" value={data.last_name} onChange={(e) => handleChange(e.currentTarget.value, 'last_name')}></Input>
            <Input placeholder="Username" value={data.username} onChange={(e) => handleChange(e.currentTarget.value, 'username')}></Input>
            <Input placeholder="Password" type="password" value={data.password} onChange={(e) => handleChange(e.currentTarget.value, 'password')}></Input>
            <TransitionGroup>
                {type === 'student' && (
                  <FadeTransition
                    in={true}
                    onEnter={() => console.log('entering')}
                    classNames="fade"
                    timeout={1500}
                    >
                    <Input placeholder="Class Code" value={data.classroom_id} onChange={(e) => handleChange(e.currentTarget.value, 'classroom_id')} />
                    
                  </FadeTransition>
                )}
                {type === 'teacher' && (
                  <>
                    <Input placeholder="City" value={data.customer.city} onChange={(e) => handleChange(e.currentTarget.value, 'city', true)}></Input>
                    <Input placeholder="Street name" value={data.customer.street_name} onChange={(e) => handleChange(e.currentTarget.value, 'street_name', true)}></Input>
                    <Input placeholder="Street number" value={data.customer.street_number} onChange={(e) => handleChange(e.currentTarget.value, 'street_number', true)}></Input>
                    <Input placeholder="State" value={data.customer.state} onChange={(e) => handleChange(e.currentTarget.value, 'state', true)}></Input>
                    <Input placeholder="Zip" value={data.customer.zip} onChange={(e) => handleChange(e.currentTarget.value, 'zip', true)}></Input>
                  </>
                )}
            </TransitionGroup>
            <Button type="submit" disabled={submitted}>Sign Up</Button>
          </Container>
        </Container>
        <Container width="50%" align="baseline">
          <img style={{ width: "100%" }} src={LearningVector} />
        </Container>
      </Card>
    </Container>

  )
}

export default Signup;