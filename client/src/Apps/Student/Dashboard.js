import React, { useEffect, useState } from 'react';
import Container from '../../Components/Container';
import Card from '../../Components/Card';
import { Text, Title, Description } from '../../Components/Text';
import WalletVector from '../../images/wallet.svg';
import DebtVector from '../../images/debt.svg';
import ProfitVector from '../../images/profits.svg';
import styled from 'styled-components';
import CashVector from '../../images/Cash.svg';
import CareerCard from './Components/CareerCard';
import Search from '../../images/search.svg';
import API from './utils/API';

const Icon = styled.img`
  height: 100%;
  margin-right: 20px;
`;

const Row = styled(Container)`
  border-right: 2px solid #8ED275;
  width: 60%;
`;

const career = {
  img: 'https://fultongarcia.com/Developer.svg',
  title: 'Software Engineer',
  description: 'Software engineering is a field of engineering, for designing and writing programs for computers or other electronic devices. A software engineer, or programmer, writes software (or changes existing software) and compiles software using methods that improve it. Better quality software is easier to use.',
  minSalary: 70000,
  maxSalary: 80000,
  role: "entry"
}

const StudentDashboard = ({ user }) => {
  const [userInformation, setUserInformation] = useState(user.user);
  useEffect(() => {
    const fetcUserInformation = async () => {
      let res = await API.getUserInformation(user.user.username);
      console.log(res.data);
      setUserInformation(res.data);

    }

    fetcUserInformation()
  }, [])
  return (
    <Container direction="column" padding="30px" width="90%">
      <Title>Hello, {userInformation.first_name}!</Title>
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
                  <Text>${userInformation.account?.balance}</Text>
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
          {userInformation.job ? <CareerCard {...userInformation.job} ></CareerCard> : (
            <Card direction="column" align="center" hover>
              <Text>Hey!</Text>
              <img style={{width: '80%'}} src={Search} />
              <Description>Looks like you don't have a career yet, head over to the 'Careers' tab to learn more about some awesome jobs and choose the right fit for you.</Description>
            </Card>
          )}
        </Container>
      </Container>
    </Container>
  )
}

export default StudentDashboard;