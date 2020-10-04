const router = require("express").Router();
const { general, job } = require("../controller");

router.get("/get", async (req, res) => {
  const query = req.query.filter || null;

  if (!query) {
    var { err, findRes } = await job.find({ role: "entry" }, { __v: 0 });
  } else {
    var { err, findByIdRes: findRes } = await job.findById(
      { _id: query },
      { __v: 0 }
    );
  }

  if (err) {
    const { statusCode, msg } = general.getStatus(err);
    return res.status(statusCode).send({ msg });
  }
  return res.send(findRes);
});

module.exports = router;
