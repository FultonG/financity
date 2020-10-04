import React, { useEffect, useState } from 'react';
import Container from '../../Components/Container';
import CareerCard from './Components/CareerCard';
import Modal from '../../Components/Modal';
import { Text } from '../../Components/Text';
import Button from '../../Components/Button';
import Card from '../../Components/Card';
import API from './utils/API';
import Check from '../../images/check.gif'
import {useHistory} from 'react-router-dom';

const Careers = ({ user }) => {
  const [careers, setCareers] = useState([])
  const [success, setSuccess] = useState(false);
  let history = useHistory();
  useEffect(() => {
    const fetchCareers = async () => {
      let res = await API.getCareers();
      setCareers(res.data);
    }

    fetchCareers();
  }, []);

  const handleSetCareer = async (val) => {
    try {
      await API.setCareer({ job_id: val, username: user.user.username })
      setSuccess(true)
    } catch (e) {
      console.log(e.message)
    }
  }
  return (
    <>
      <Container direction="column" padding="30px" width="90%">
        <Container justify="space-evenly">
          {careers.map(career => (
            <CareerCard width="25%" {...career} cursor="pointer" onClick={() => handleSetCareer(career._id)}></CareerCard>
          ))}
        </Container>
      </Container>
      <Modal show={success}>
        <Card height="60%" width="50%" direction="column" justify="space-evenly">
          <img src={Check} />
          <Text>Job Changed!</Text>
          <Button onClick={() => history.push('/')}>Go to Dashboard</Button>
        </Card>
      </Modal>
    </>
  )
}

export default Careers;