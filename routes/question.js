const router = require("express").Router();
const { general, question } = require("../controller");

router.get("/get/:question_id", async (req, res) => {
  const _id = req.params.question_id;

  const { err, findByIdRes } = await question.findById({ _id }, { __v: 0 });

  if (err) {
    const { statusCode, msg } = general.getStatus(err);
    return res.status(statusCode).send({ msg });
  }
  return res.send(findByIdRes);
});

module.exports = router;
