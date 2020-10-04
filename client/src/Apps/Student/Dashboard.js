import React from 'react';
import Container from '../../Components/Container';
import Card from '../../Components/Card';
import {Text, Title } from '../../Components/Text';
import WalletVector from '../../images/wallet.svg';
import DebtVector from '../../images/debt.svg';
import ProfitVector from '../../images/profits.svg';
import styled from 'styled-components';
import CashVector from '../../images/Cash.svg';
import Developer from '../../images/Developer.svg';
import CareerCard from './Components/CareerCard';

const Icon = styled.img`
  height: 100%;
  margin-right: 20px;
`;

const Row = styled(Container)`
  border-right: 2px solid #8ED275;
  width: 60%;
`;

const StudentDashboard = () => {
  return (
    <Container direction="column" padding="30px" width="90%">
      <Title>Hello, Student!</Title>
      <Container>
        <Container width="60%" direction="column">
          <Container height="40%" justify="space-between" padding="40px">
            <Card width="45%" direction="column" align="start" padding="15px" hover>
              <Container height="20%" margin="10px 0px">
                <Row align="center">
                  <Icon src={WalletVector} />
                  <Text>Cash:</Text>
                </Row>
                <Container width="40%" justify="center" align="center">
                  <Text>
                    $500
              </Text>
                </Container>
              </Container>
              <Container height="20%" margin="10px 0px">
                <Row align="center">
                  <Icon src={DebtVector} />
                  <Text>Debt:</Text>
                </Row>
                <Container width="40%" justify="center" align="center">
                  <Text>
                    $25
              </Text>
                </Container>
              </Container>
              <Container height="20%" margin="10px 0px">
                <Row align="center">
                  <Icon src={ProfitVector} />
                  <Text>Investments:</Text>
                </Row>
                <Container width="40%" justify="center" align="center">
                  <Text>
                    $50
              </Text>
                </Container>
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
        <Container width="40%" padding="40px">
        <CareerCard img={Developer}></CareerCard>
        </Container>
      </Container>
    </Container>
  )
}

export default StudentDashboard;