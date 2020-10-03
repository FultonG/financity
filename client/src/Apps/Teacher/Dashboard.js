import React from 'react';
import Container from '../../Components/Container';
import Card from  '../../Components/Card';
import { Bold, Text } from '../../Components/Text';
import SideProfile from '../../Components/SideProfile';

const Dashboard = () => {
  return (
    <>
    <Container wrap="wrap" direction="column" padding="20px" width="80%">
      <h1>Overview</h1>
      <Container height="10%" justify="space-evenly">
        <Card width="20%" direction="column" align="start" padding="15px" hover>
          <Bold>20</Bold>
          <Text>Hackathons Attended</Text>
        </Card>
        <Card width="20%" margin="0px 0px 0px 20px" direction="column" align="start" padding="15px" hover>
          <Bold>24</Bold>
          <Text>Projects Submitted</Text>
        </Card>
        <Card width="20%" margin="0px 0px 0px 20px" direction="column" align="start" padding="15px" hover>
          <Bold>18</Bold>
          <Text>Category Wins</Text>
        </Card>
        <Card width="20%" margin="0px 0px 0px 20px" direction="column" align="start" padding="15px" hover>
          <Bold>5</Bold>
          <Text>Top 3 Placements</Text>
        </Card>
      </Container>
    </Container>
    <Container width="20%">
      <SideProfile/>
    </Container>
    </>
  )
}

export default Dashboard;