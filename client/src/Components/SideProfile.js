import React from 'react';
import Container from './Container';
import ProfileDropDown from './ProfileDropDown'
import Classes from './Classes';
import styled from 'styled-components';
import { Title } from '../../src/Components/Text';


const StyledContainer = styled(Container)`
  background: white;
`;

const SideProfile = () => {
  return (
    <StyledContainer justify="center">

      <Container direction="column">
        <Container height="10%" justify="space-between">
          <ProfileDropDown />
        </Container>

        <Title size="18px" padding="20px 30px">Classes</Title>

        <Container height="20%" direction="column" justify="space-evenly" margin="20px 0px">
          <Classes />
        </Container>
        <Title size="18px" padding="20px 30px">Upcoming Classes</Title>
      </Container>

    </StyledContainer>


  )
};

export default SideProfile;
