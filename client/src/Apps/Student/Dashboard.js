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
  height: 100%
`;

const StudentDashboard = () => {
  return (
    <Container direction="column" padding="30px" width="90%">
      <Title>Hello, Student!</Title>
      <Container>
        <Container width="60%" direction="column">
          <Container height="40%" justify="space-between" padding="40px">
            <Card width="45%" direction="column" align="start" padding="15px" hover>
              <Container height="33%" width="40%" align="baseline">
                <Icon src={WalletVector} />
                <Text>Cash:</Text>
              </Container>
              <Container height="33%" width="40%" align="baseline">
                <Icon src={DebtVector} />
                <Text>Debt:</Text>
                
              </Container>
              <Container height="33%" width="40%" align="baseline">
                <Icon src={ProfitVector} />
                <Text>Investments:</Text>
              </Container>

              <Container height="33%" width="10%" align="baseline" padding="30px" direction="row" margin-bottom="10px" border-right="2px solid #8ED275d" > 
                <Text>$500</Text>
              </Container>

              <Container height="33%" width="10%" align="baseline" padding="30px" direction="row" margin-bottom="10px"> 
                <Text>$50</Text>
              </Container>

              <Container height="33%" width="10%" align="baseline" padding="30px" direction="row" margin-bottom="10px"> 
                <Text>$25</Text>
              </Container>

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