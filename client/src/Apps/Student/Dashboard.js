import React from 'react';
import Container from '../../Components/Container';
import Card from '../../Components/Card';
import { Bold, Text, Title, Rectangle } from '../../Components/Text';
import WalletVector from '../../images/wallet.svg';
import DebtVector from '../../images/debt.svg';
import ProfitVector from '../../images/profits.svg';
import styled from 'styled-components';
import CashVector from '../../images/Cash.svg';
import Developer from '../../images/Developer.svg';

const Icon = styled.img`
  height: 100%;
  margin-right: 20px;
`;

const Row = styled(Container)`
  border-right: 2px solid #8ED275;
  margin: 10px 0px;
`;

const StudentDashboard = () => {
  return (
    <Container direction="column" padding="30px" width="90%">
      <Title>Hello, Student!</Title>
      <Container>
        <Container width="60%" direction="column">
          <Container height="40%" justify="space-between" padding="40px">
            <Card width="45%" direction="column" align="start" padding="15px" hover>
              <Row height="20%" width="60%" align="center">
                <Icon src={WalletVector} />
                <Text>Cash:</Text>
              </Row>
              <Row height="20%" width="60%" align="center">
                <Icon src={DebtVector} />
                <Text>Debt:</Text>
                
              </Row>
              <Row height="20%" width="60%" align="center">
                <Icon src={ProfitVector} />
                <Text>Investments:</Text>
              </Row>

            </Card>
            <Card width="45%" direction="row" align="start" padding="40px" hover>
              <Container height="70%" justify="center">
                <Icon src={CashVector} />
              </Container>
              <Text>You are currently ranked #1 out of 20 students!</Text>
            </Card>
          </Container>
          <Container padding="40px">
            <Card hover>
              
            </Card>
          </Container>
        </Container>
        <Container padding="40px" width="40%">
        <Card direction="row" align="start" hover>
          <Container height="10%" justify="center" padding="40px">
            <Text>Software Developer</Text>
          </Container>
          <Container justify="center" direction="column" height="40%" margin="40px">
            <Icon src={Developer} />
            <Text>Student Name: Student Name</Text>
            <Text>Salary: $75,000 </Text>
            <Text>Expenses: </Text>
          </Container>
        </Card>
        </Container>
        
      </Container>
    </Container>
  )
}

export default StudentDashboard;