const router = require("express").Router();
const yahooFinance = require("yahoo-finance");

router.get("/ticker/:ticker", async (req, res) => {
  const ticker = req.params.ticker;

  try {
    const quote = await yahooFinance.quote({
      symbol: ticker,
      modules: ["summaryDetail"],
    });

    return res.send(quote);
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

module.exports = router;
