const router = require("express").Router();
const { general, finance } = require("../../controller");

router.get("/get/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;

  const { accountErr, accountRes } = await finance.getAccounts(customer_id);
  if (accountErr) {
    const { msg, statusCode } = general.getStatus(customerErr);
    return res.status(statusCode).send(msg);
  }
  return res.send(accountRes);
});

module.exports = router;
