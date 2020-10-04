import React, {useState} from 'react';
import Container from '../../Components/Container';
import Card from '../../Components/Card';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { Bold, Text } from '../../Components/Text';
import LearningVector from '../../images/airplane.svg'
import Modal from '../../Components/Modal';
import Check from '../../images/check.gif'
import API from './utils/API';

const initialLogin = {
  username: '',
  password: ''
}

const Login = ({setUser}) => {
  const [type, setType] = useState('student');
  const [formdata, setFormdata] = useState(initialLogin);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState(null);
  const handleChange = (val, attr) => {
    return setFormdata(old => ({ ...old, [attr]: val }));
  }
 
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSubmitted(true);
      if (type === 'student') {
        let {data} = await API.login('student', formdata);
        setResponse({...data, role: 'student'})
        localStorage.setItem('user', JSON.stringify({...data, role: 'student'}));
        setSuccess(true);
      } else {
        let {data} = await API.login('teacher', formdata);
        setResponse({...data, role: 'teacher'})
        localStorage.setItem('user', JSON.stringify({...data, role: 'teacher'}));
        setSuccess(true);
      }
    } catch (e) {
      console.log(e.message);
      setFormdata(initialLogin);
      setSubmitted(false);
    }
  }

  const handleUser = () => {
    setUser(response);
  }
  return (
    <>
    <Container justify="center" align="center">
    <Card height="60%" width="80%" align="normal" justify="flex-start">
      <Container width="40%" direction="column" padding="20px">
        <Container height="50%" direction="column" justify="center">
          <Bold>Welcome back!</Bold>
        </Container>
          <Container as="form" width="100%" direction="column" align="center" onSubmit={handleSubmit}>
            <Input placeholder="Username" value={formdata.username} onChange={(e) => handleChange(e.currentTarget.value, 'username')}></Input>
            <Input placeholder="Password" type="password" value={formdata.password} onChange={(e) => handleChange(e.currentTarget.value, 'password')}></Input>
            <Input className="selector" as="select" value={type} onChange={(e) => setType(e.currentTarget.value)}>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </Input>
            <Button type="submit">Login</Button>
          </Container>
      </Container>
      <Container width="60%" align="baseline" justify="center">
        <img style={{height: "100%"}}src={LearningVector} />
      </Container>
    </Card>
  </Container>
   <Modal show={success}>
   <Card height="60%" width="50%" direction="column" justify="space-evenly">
     <img src={Check} />
     <Text>Logged in successfully!</Text>
     <Button onClick={handleUser}>Go to Dashboard</Button>
   </Card>
 </Modal>
</>
  )
};

export default Login;