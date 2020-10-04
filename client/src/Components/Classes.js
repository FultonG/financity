import React from 'react';
import styled from 'styled-components';
import Container from './Container';
import { Text } from '../../src/Components/Text';

const ClassPicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

const Classes = () => {
    return (
        <>
    <Container height="30%" width="90%" justify="space-evenly" margin="20px">
      <ClassPicture src="https://i.guim.co.uk/img/media/a4614a7add9d855c0fcf9f0cb3b68599bd41865f/0_382_5760_3458/master/5760.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=e3a6b75200e950d1e5a9e8dd97ffa544"/>
      <Text lineheight="50px" weight="600" size="16px">Class 1</Text>
      <Text lineheight="50px" size="14px" weight="400" color="#535353">Access Code: 123456</Text>
    </Container>

<Container height="30%" width="90%" justify="space-evenly" margin="20px">
<ClassPicture src="https://i.guim.co.uk/img/media/a4614a7add9d855c0fcf9f0cb3b68599bd41865f/0_382_5760_3458/master/5760.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=e3a6b75200e950d1e5a9e8dd97ffa544"/>
<Text lineheight="50px" weight="600" size="16px">Class 2</Text>
<Text lineheight="50px" size="14px" weight="400" color="#535353">Access Code: 789101</Text>
</Container>

<Container height="30%" width="90%" justify="space-evenly" margin="20px" >
<ClassPicture src="https://i.guim.co.uk/img/media/a4614a7add9d855c0fcf9f0cb3b68599bd41865f/0_382_5760_3458/master/5760.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=e3a6b75200e950d1e5a9e8dd97ffa544"/>
<Text lineheight="50px" weight="600" size="16px">Class 3</Text>
<Text lineheight="50px" size="14px" weight="400" color="#535353">Access Code: 133702</Text>
</Container>
</>
    )
}

export default Classes;