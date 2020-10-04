const { student, general, question } = require("../controller");
const router = require("express").Router();
const { finance } = require("../controller");

router.get("/get/:username", async (req, res) => {
  const username = req.params.username;

  const { err, findOneRes } = await student.findOne(
    { username },
    {
      _id: 0,
      __v: 0,
      password: 0,
    }
  );
  if (err) {
    const { statusCode, msg } = general.getStatus(err);
    return res.status(statusCode).send({ msg });
  }

  return res.send(findOneRes);
});

router.post("/create", async (req, res) => {
  const username = req.body.username;
  const pwd = req.body.password;
  const classroom_id = req.body.classroom_id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;

  const hashedPwd = await general.hashPwd(pwd);
  const { err, createRes } = await student.create({
    username,
    password: hashedPwd,
    classroom_id,
    first_name,
    last_name,
  });
  if (err) {
    const { statusCode, msg } = general.getStatus(err);
    return res.status(statusCode).send({ msg });
  }
  return res.send(createRes);
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const pwd = req.body.password;

  const { err, findOneRes } = await student.findOne(
    { username },
    { __v: 0, _id: 0 }
  );

  const { password: hashedPwd, ...user } = findOneRes;
  const truePwd = await general.comparePwd(pwd, hashedPwd);

  if (truePwd) {
    const token = general.createJwt(user);
    return res.send({ user, token });
  }
  return res.status(400).send({ msg: "Incorrect password" });
});

router.post("/set_job", async (req, res) => {
  const _id = req.body.job_id;
  const username = req.body.username;

  const { jobErr, jobRes } = await student.setJob({ _id, username });
  if (jobErr) {
    const { statusCode, msg } = general.getStatus(jobErr);
    return res.status(statusCode).send({ msg });
  }

  return res.send(jobRes);
});

router.post("/complete_question", async (req, res) => {
  const _id = req.body.question_id;
  const username = req.body.username;

  let { err, findByIdRes } = await question.findById({ _id }, { __v: 0 });
  if (err) {
    const { statusCode, msg } = general.getStatus(jobErr);
    return res.status(statusCode).send({ msg });
  }

  const { next, pay } = findByIdRes;

  let { err: errNext, findByIdRes: resNext } = await question.findById(
    { _id: next },
    { __v: 0 }
  );
  if (errNext) {
    const { statusCode, msg } = general.getStatus(errNext);
    return res.status(statusCode).send({ msg });
  }

  const { next: secondNext } = resNext;

  const { err: findOneErr, findOneRes } = await student.findOne(
    { username },
    { _id: 0, questions_solved: 1, account: 1 }
  );
  if (findOneErr) {
    const { statusCode, msg } = general.getStatus(findOneErr);
    return res.status(statusCode).send({ msg });
  }

  if (findOneRes.questions_solved.includes(_id)) {
    return res.status(400).send({ msg: "Question already solved" });
  }

  const { depositErr, depositRes } = await finance.deposit({
    account_id: findOneRes.account._id,
    medium: "balance",
    amount: pay,
  });
  if (depositErr) {
    const { statusCode, msg } = general.getStatus(depositErr);
    return res.status(statusCode).send({ msg });
  }

  const { updateErr, updateRes } = await student.updateOne(
    { username },
    {
      "job.question": next,
      "job.next": secondNext,
      $push: {
        questions_solved: {
          question_id: _id,
          date_completed: new Date(),
        },
      },
    }
  );
  if (updateErr) {
    const { statusCode, msg } = general.getStatus(updateErr);
    return res.status(statusCode).send({ msg });
  }

  const { err: userErr, findOneRes: user } = await student.findOne(
    { username },
    {
      _id: 0,
      __v: 0,
      password: 0,
    }
  );
  if (userErr) {
    const { statusCode, msg } = general.getStatus(userErr);
    return res.status(statusCode).send({ msg });
  }

  return res.send(user);
});

router.get("/new_goal/:username/:goal", async (req, res) => {
  const username = req.params.username;
  const currGoal = req.params.goal;

  const minGoal = Math.floor(currGoal * 1.25);
  const maxGoal = Math.floor(currGoal * 2);

  const newGoal = Math.floor(Math.random() * (maxGoal - minGoal + 1) + minGoal);
  console.log(minGoal, maxGoal, newGoal);

  const { updateErr, updateRes } = await student.updateOne(
    { username },
    { goal: newGoal }
  );
  if (updateErr) {
    const { statusCode, msg } = general.getStatus(updateErr);
    return res.status(statusCode).send({ msg });
  }

  return res.send(updateRes);
});

module.exports = router;
