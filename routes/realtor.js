const router = require("express").Router();
const { general, realtor } = require("../controller");

router.get("/house/:code/:limit", async (req, res) => {
  const code = req.params.code;
  const limit = req.params.limit;

  const { houseErr, houseRes } = await realtor.house({
    limit,
    code,
    offset: 0,
  });
  if (houseErr) {
    const { msg, statusCode } = general.getStatus(classErr);
    return res.status(statusCode).send({ msg });
  }

  return res.send(houseRes);
});

router.get("/get_house/:property_id", async (req, res) => {
  const property_id = req.params.property_id;

  const { houseErr, houseRes } = await realtor.getHouse(property_id);
  if (houseErr) {
    const { msg, statusCode } = general.getStatus(houseErr);
    return res.status(statusCode).send({ msg });
  }

  return res.send(houseRes);
});

module.exports = router;
