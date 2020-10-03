import React from 'react';
import styled from 'styled-components';
import Container from './Container';

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

const ProfileDropDown = () => {
  return (
    <Container height="20%" width="80%" justify="space-evenly" margin="20px 0px">
      <ProfilePicture src="https://fultongarcia.com/profile-square.jpg"/>
      <p>Fulton Garcia</p>
    </Container>
  )
}

export default ProfileDropDown;