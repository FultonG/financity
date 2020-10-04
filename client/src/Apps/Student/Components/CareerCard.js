import React from 'react';
import Card from '../../../Components/Card';
import { Text, Description } from '../../../Components/Text';
import styled from 'styled-components';

const Icon = styled.img`
  width: 80%;
`;

const CareerCard = ({ image, width, title, description, minSalary, maxSalary, role, cursor, onClick }) => {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  return (
    <Card width={width} direction="column" justify="space-evenly" align="center" hover cursor={cursor} onClick={onClick}>
      <Text>{title}</Text>
      <Icon src={image} />
      <Description>{description}</Description>
      <Text>Salary Range: {formatter.format(minSalary)} - {formatter.format(maxSalary)}</Text>
      <Text>Role Level: {role}</Text>
    </Card>
  )
}

export default CareerCard;