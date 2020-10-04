const router = require("express").Router();
const { general, finance } = require("../../controller");

router.post("/create", async (req, res) => {
  const account_id = req.body.account_id;
  const amount = req.body.amount;

  const { depositErr, depositRes } = await finance.deposit({
    account_id,
    amount,
    medium: "balance",
  });
  if (depositErr) {
    const { statusCode, msg } = general.getStatus(depositErr);
    return res.status(statusCode).send({ msg });
  }

  return res.send(depositRes);
});

router.get("/get/:account_id", async (req, res) => {
  const account_id = req.params.account_id;

  const { depositErr, depositRes } = await finance.getDeposits(account_id);
  if (depositErr) {
    const { statusCode, msg } = general.getStatus(depositErr);
    return res.status(statusCode).send({ msg });
  }
  return res.send(depositRes);
});

module.exports = router;
