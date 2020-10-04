import React, { useEffect, useState } from 'react';
import Container from '../../Components/Container';
import Card from '../../Components/Card';
import { Text, Title, Description } from '../../Components/Text';
import API from './utils/API';
import Button from '../../Components/Button';
import Check from '../../images/check.gif'
import Modal from '../../Components/Modal';
import { useHistory } from 'react-router-dom';

const RealEstate = ({ user }) => {
  const [properties, setProperties] = useState([])
  const [success, setSuccess] = useState(false);
  let history = useHistory();

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  useEffect(() => {
    const fetchProperties = async () => {
      let res = await API.getProperties(user.classroom_id);
      setProperties(res.data);
    }

    fetchProperties();
  }, [])

  const handlePurchase = async (property_id) => {
    try {
      let res = await API.buyProperty({username: user.username, property_id});
      console.log(res.data);
      setSuccess(true);
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <>
      <Container direction="column" padding="30px" width="90%">
        <Title>Real Estate Opportunities</Title>
        <Container justify="space-evenly" height="100%" wrap="wrap" overflow>
          {properties.map(property => (
            <Card justify="flex-start" margin="0px 0px 10px 0px" hover cursor="pointer">
              <img style={{ width: '20%', marginRight: '20px' }} src={property.thumbnail}></img>
              <Container width="50%" direction="column" align="self-start" padding="20px" justify="space-between">
                <Description>Beds: {property.beds} Baths: {property.baths} </Description>
                <Description>{property.address.line} {property.address.city} {property.address.postal_code}</Description>
                <Text>Price: {formatter.format(property.price)}</Text>
                <Button onClick={() => handlePurchase(property.property_id)}>Buy now!</Button>
              </Container>
            </Card>
          ))}
        </Container>
      </Container>
      <Modal show={success}>
        <Card height="60%" width="50%" direction="column" justify="space-evenly">
          <img src={Check} />
          <Text>Home Purchased!</Text>
          <Button onClick={() => history.push('/')}>Go to Dashboard</Button>
        </Card>
      </Modal>
    </>
  )
};

export default RealEstate;