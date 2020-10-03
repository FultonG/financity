import React from 'react';
import Container from './Container';
import ProfileDropDown from './ProfileDropDown'
import styled from 'styled-components';


const StyledContainer = styled(Container)`
  background: white;
`;

const SideProfile = () => {
  return (
    <StyledContainer justify="center">
      <ProfileDropDown/>
    </StyledContainer>
  )
};

export default SideProfile;
