const router = require("express").Router();
const { general, class_ } = require("../controller");

router.get("/get/:customer_id", async (req, res) => {
  const query = req.query.filter || null;
  const customer_id = req.params.customer_id;

  if (!query) {
    var { classErr, classRes } = await class_.find(
      { customer_id },
      { _id: 0, __v: 0 }
    );
  } else {
    var { classErr, classRes } = await class_.findOne(
      { code: query },
      { _id: 0, __v: 0 }
    );
  }

  if (classErr) {
    const { statusCode, msg } = general.getStatus(classErr);
    return res.status(statusCode).send({ msg });
  }

  return res.send(classRes);
});

module.exports = router;
