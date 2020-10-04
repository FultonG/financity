import React from 'react';
import Container from '../../Components/Container';
import CareerCard from './Components/CareerCard';
import { Title } from '../../Components/Text';

const Careers = () => {
  return (
    <Container direction="column" padding="30px" width="90%">
      <Title>Careers</Title>
      <Container justify="space-evenly">
        {careers.map(career => (
           <CareerCard  width="25%" {...career}></CareerCard>
        ))}
      </Container>
    </Container>
  )
}

const careers = [
  {
    img: 'https://fultongarcia.com/Developer.svg',
    title: 'Software Engineer',
    description: 'Software engineering is a field of engineering, for designing and writing programs for computers or other electronic devices. A software engineer, or programmer, writes software (or changes existing software) and compiles software using methods that improve it. Better quality software is easier to use.',
    minSalary: 70000,
    maxSalary: 80000,
    role: "entry"
  },
  {
    img: 'https://fultongarcia.com/accountant.svg',
    title: 'Accountant',
    description: 'An accountant is someone who studies and keeps track of financial information. Businesses and other organizations need accounting systems to know if they are making money. Accountants prepare financial statements, study costs, calculate taxes, and provide other information to help make decisions about how to spend and save money.',
    minSalary: 50000,
    maxSalary: 60000,
    role: "entry"
  },
  {
    img: 'https://fultongarcia.com/doctor.svg',
    title: 'Doctor',
    description: 'Doctors are people who practice medicine. Doctors are trained to keep people healthy and to heal the sick. There are many parts to a doctor’s job. Doctors first need to identify what is making a person sick. Then they decide on a treatment. They also predict when the patient will feel better. When treating patients, doctors work with many other people.',
    minSalary: 150000,
    maxSalary: 160000,
    role: "entry"
  }
]

export default Careers;