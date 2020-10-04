import React from 'react';
import styled from 'styled-components';
import Container from './Container';
import {Text} from '../../src/Components/Text';

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

const ProfileDropDown = () => {
  return (
    <Container height="20%" width="80%" justify="space-evenly" margin="20px 0px">
      <ProfilePicture src="https://fultongarcia.com/profile-square.jpg"/>
      <Text lineheight="50px" size="20px" weight="600">Fulton Garcia</Text>
    </Container>
  )
}

export default ProfileDropDown;