import React, { useEffect, useState } from 'react';
import Container from '../../Components/Container';
import CareerCard from './Components/CareerCard';
import { Title } from '../../Components/Text';
import API from './utils/API';

const Careers = () => {
  const [careers, setCareers] = useState([])
  useEffect(() => {
    const fetchCareers = async () => {
      let res = await API.getCareers();
      setCareers(res.data);
    }

    fetchCareers();
  }, []);
  return (
    <Container direction="column" padding="30px" width="90%">
      <Title>Careers</Title>
      <Container justify="space-evenly">
        {careers.map(career => (
           <CareerCard  width="25%" {...career} cursor="pointer"></CareerCard>
        ))}
      </Container>
    </Container>
  )
}

export default Careers;