import React from 'react';
import Card from '../../../Components/Card';
import { Text } from '../../../Components/Text';
import styled from 'styled-components';

const Icon = styled.img`
  width: 80%;
`;

const Description = styled(Text)`
  font-size: 16px;
  font-weight: 200;
  text-align: left;
  width: 80%;
`;
const CareerCard = ({ img, width, title, description, minSalary, maxSalary, role }) => {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  return (
    <Card width={width} direction="column" justify="space-evenly" align="center" hover>
      <Text>{title}</Text>
      <Icon src={img} />
      <Description>{description}</Description>
      <Text>Salary Range: {formatter.format(minSalary)} - {formatter.format(maxSalary)}</Text>
      <Text>Role Level: {role}</Text>
    </Card>
  )
}

export default CareerCard;