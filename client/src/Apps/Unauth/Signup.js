import React, { useState } from 'react';
import Container from '../../Components/Container';
import Card from '../../Components/Card';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { Bold, Text } from '../../Components/Text';
import LearningVector from '../../images/signup.svg'
import Modal from '../../Components/Modal';
import Check from '../../images/check.gif'
import API from './utils/API';

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

const Signup = ({setUser}) => {
  const [type, setType] = useState('student');
  const [data, setData] = useState(initialSignup);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState(null);
  const handleChange = (val, attr, inner = false) => {
    if (inner) {
      return setData(old => ({ ...old, customer: { ...old.customer, [attr]: val } }));
    }
    return setData(old => ({ ...old, [attr]: val }));
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSubmitted(true);
      if (type === 'student') {
        const { customer, ...obj } = data;
        let res = await API.signup('student', obj);
        setResponse({...res, role: 'student'})
        localStorage.setItem('user', res);
        setSuccess(true);
      } else {
        const { classroom_id, ...obj } = data;
        let res = await API.signup('teacher', obj);
        setResponse({...res, role: 'teacher'})
        localStorage.setItem('user', res);
        setSuccess(true);
      }
    } catch (e) {
      console.log(e.message);
      setData(initialSignup);
      setSubmitted(false);
    }
  }

  const handleUser = () => {
    setUser(response);
  }
  return (
    <>
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
              {type === 'student' && (
                <Input placeholder="Class Code" value={data.classroom_id} onChange={(e) => handleChange(e.currentTarget.value, 'classroom_id')} />
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
              <Button type="submit" disabled={submitted}>Sign Up</Button>
            </Container>
          </Container>
          <Container width="50%" align="baseline">
            <img style={{ width: "100%" }} src={LearningVector} />
          </Container>
        </Card>
      </Container>
      <Modal show={success}>
        <Card height="60%" width="50%" direction="column" justify="space-evenly">
          <img src={Check} />
          <Text>Account created successfully!</Text>
          <Button onClick={handleUser}>Go to Dashboard</Button>
        </Card>
      </Modal>
    </>

  )
}

export default Signup;