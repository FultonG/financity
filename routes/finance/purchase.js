const router = require("express").Router();
const { finance, general } = require("../../controller");

router.post("/create", async (req, res) => {
  const account_id = req.body.account_id;
  const amount = req.body.amount;

  const { purchaseErr, purchaseRes } = await finance.purchase({
    account_id,
    amount,
    medium: "balance",
  });
  if (purchaseErr) {
    const { statusCode, msg } = general.getStatus(purchaseErr);
    return res.status(statusCode).send({ msg });
  }
  return res.send(purchaseRes);
});

router.get("/get/:account_id", async (req, res) => {
  const account_id = req.params.account_id;

  const { purchaseErr, purchaseRes } = await finance.getPurchases(account_id);
  if (purchaseErr) {
    const { statusCode, msg } = general.getStatus(purchaseErr);
    return res.status(statusCode).send({ msg });
  }

  return res.send(purchaseRes);
});

module.exports = router;
