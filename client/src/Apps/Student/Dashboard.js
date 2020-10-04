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
import Button from '../../Components/Button';
import { useHistory } from 'react-router-dom';
import Assets from '../../images/assets.svg';

const Icon = styled.img`
  height: 100%;
  margin-right: 20px;
`;

const Row = styled(Container)`
  border-right: 2px solid #8ED275;
  width: 60%;
`;

const Ticker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #003362;
  color: white;
  height: 25px;
  width: 80px;
  margin: 10px;
  border-radius: 10px;
`;


const StudentDashboard = ({ user }) => {
  let history = useHistory();
  const [userInformation, setUserInformation] = useState(user);
  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        let res = await API.getUserInformation(user.username);
        let temp = 0;
        res.data.securities.forEach(obj => {
          temp += obj.amountInvested;
        });
        res.data.investments = temp;
        setUserInformation(res.data);
      } catch (e) {
        console.log(e.message);
      }

    }

    fetchUserInformation()
  }, [])

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  const handleRedirect = () => {
    history.push('/careers');
  }
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
                  <Text>{formatter.format(userInformation.account?.balance)}</Text>
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
                    ${userInformation.investments || '0'}
              </Text>
                </Container>
              </Container>

            </Card>
            <Card width="45%" direction="row" align="start" padding="40px" hover>
              <Text>Your Current Investments</Text>
              <Container height="70%" justify="center" wrap="wrap">
                {userInformation.securities.map(obj => (
                  <Ticker>{obj.ticker}</Ticker>
                ))}
              </Container>
            </Card>
          </Container>
          <Container padding="40px">
            <Card hover>
              <img style={{ width: '80%' }} src={Assets}></img>
            </Card>
          </Container>
        </Container>
        <Container width="40%" padding="40px">
          {userInformation.job ? <CareerCard {...userInformation.job} ></CareerCard> : (
            <Card direction="column" align="center" justify="space-evenly" hover>
              <Text>Hey!</Text>
              <img style={{ width: '80%' }} src={Search} />
              <Description>Looks like you don't have a career yet, head over to the 'Careers' tab to learn more about some awesome jobs and choose the right fit for you.</Description>
              <Button onClick={handleRedirect}>Go to Careers</Button>
            </Card>
          )}
        </Container>
      </Container>
    </Container>
  )
}

export default StudentDashboard;