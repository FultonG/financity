import React, { useEffect, useState } from "react";
import Container from "../../Components/Container";
import Card from "../../Components/Card";
import { Text, Title, Description } from "../../Components/Text";
import API from "./utils/API";
import Button from "../../Components/Button";
import Check from "../../images/check.gif";
import Modal from "../../Components/Modal";
import { useHistory } from "react-router-dom";
import moment from "moment";
import StockChart from "./Components/StockChart";

const Stocks = ({ user }) => {
  const [stocks, setStocks] = useState([]);
  const [success, setSuccess] = useState(false);
  let history = useHistory();

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  useEffect(() => {
    const fetchStocks = async () => {
      let res = await API.getStocks(user.classroom_id).then((res) => res.data);
      //   setStocks(res.data);

      let newStocks = [];
      for (const key in res) {
        let stockData = res[key];
        let now = moment().format("YYYY-MM-DD");
        let before = moment().subtract(1, "year").format("YYYY-MM-DD");

        let { data } = await API.getStockHistoricalData(
          stockData.symbol,
          before,
          now
        );
        stockData.historical = data
          .map((datum) => {
            return { ...datum, close: parseFloat(datum.close).toFixed(2) };
          })
          .reverse();
        newStocks.push(stockData);
      }
      setStocks(newStocks);
    };

    fetchStocks();
  }, []);

  const handlePurchase = async (ticker, shares) => {
    try {
      let res = await API.buyStock({ username: user.username, ticker, shares });
      console.log(res.data);
      setSuccess(true);
    } catch (e) {
      console.log(e.message);
    }
  };
  function returnStocks() {
    let cards = [];
    for (const key in stocks) {
      let stock = stocks[key];
      let historicalData = stock.historical.map((h) => {
        const date = new Date(h.date);
        const month = date.getUTCMonth();
        const day = date.getUTCDay();
        const year = date.getUTCFullYear();
        const dateFormat = month + "-" + day + "-" + year;

        return { time: dateFormat, value: parseFloat(h.close) };
      });
      console.log(historicalData);
      cards.push(
        <Card
          justify="flex-start"
          margin="0px 0px 10px 0px"
          hover
          cursor="pointer"
        >
          {/* <img style={{ width: '20%', marginRight: '20px' }} src={property.thumbnail}></img> */}
          {/* <div style={{ width: '20%', marginRight: '20px' }}>graph</div> */}
          <StockChart data={historicalData} style={{ padding: "15px" }} />
          <Container
            width="50%"
            direction="column"
            align="self-start"
            padding="20px"
            justify="space-between"
          >
            {/* <Description>Beds: {property.beds} Baths: {property.baths} </Description>
              <Description>{property.address.line} {property.address.city} {property.address.postal_code}</Description>
              <Text>Price: {formatter.format(property.price)}</Text> */}
            <h3>
              {stock.symbol} - {stock.name}
            </h3>
            <Button onClick={() => handlePurchase(stock.symbol)}>
              Buy now!
            </Button>
          </Container>
        </Card>
      );
    }
    return cards;
  }
  return (
    <>
      <Container direction="column" padding="30px" width="90%">
        <Title>Stocks</Title>
        <Container justify="space-evenly" height="100%" wrap="wrap" overflow>
          {returnStocks()}
        </Container>
      </Container>
      <Modal show={success}>
        <Card
          height="60%"
          width="50%"
          direction="column"
          justify="space-evenly"
        >
          <img src={Check} />
          <Text>Home Purchased!</Text>
          <Button onClick={() => history.push("/")}>Go to Dashboard</Button>
        </Card>
      </Modal>
    </>
  );
};

export default Stocks;
