const router = require("express").Router();
const yahooFinance = require("yahoo-finance");

router.get("/ticker/:ticker", async (req, res) => {
  const ticker = req.params.ticker;

  try {
    const quote = await yahooFinance.quote({
      symbol: ticker,
      modules: ["summaryDetail"],
    });
    const {
      previousClose,
      open,
      dayLow,
      dayHigh,
      volume,
      marketCap,
    } = quote.summaryDetail;

    return res.send({
      previousClose,
      open,
      dayLow,
      dayHigh,
      volume,
      marketCap,
    });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.get("/history/:ticker/:from/:to", async (req, res) => {
  const ticker = req.params.ticker;
  const from = req.params.from;
  const to = req.params.to;
  const period = req.query.period || "d";

  try {
    const history = await yahooFinance.historical({
      symbol: ticker,
      from,
      to,
      period,
    });

    return res.send(history);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.get("/info/:ticker", async (req, res) => {
  const ticker = req.params.ticker;

  try {
    const info = await yahooFinance.snapshot({
      symbol: ticker,
      fields: ["s", "n", "o", "p", "y", "g", "h"],
    });
    const quote = await yahooFinance.quote({
      symbol: ticker,
      modules: ["summaryDetail"],
    });

    const { volume, marketCap } = quote.summaryDetail;

    return res.send({ ...info, volume, marketCap });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
});

router.get("/default", async (req, res) => {
  try {
    const info = await yahooFinance.snapshot({
      symbols: ["TSLA", "AMZN", "NFLX", "MSFT", "V", "NKE"],
      fields: ["s", "n", "o", "p"],
    });

    return res.send(info);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

module.exports = router;
