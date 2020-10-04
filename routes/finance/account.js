const router = require("express").Router();
const { general, finance } = require("../../controller");

router.get("/get/:account_id", async (req, res) => {
  const account_id = req.params.account_id;

  const { accountErr, accountRes } = await finance.getAccount(account_id);
  if (accountErr) {
    const { statusCode, msg } = general.getStatus(accountErr);
    return res.status(statusCode).send({ msg });
  }
  return res.send(accountRes);
});

module.exports = router;
