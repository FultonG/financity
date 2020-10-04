const { teacher, general, class_, task, student } = require("../controller");
const router = require("express").Router();

router.get("/get/:username", async (req, res) => {
  const username = req.params.username;

  const { err, findOneRes } = await teacher.findOne(
    { username },
    {
      _id: 0,
      __v: 0,
      password: 0,
    }
  );

  return res.send(findOneRes);
});

router.post("/create", async (req, res) => {
  const username = req.body.username;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const pwd = req.body.password;
  const customer = req.body.customer;

  const hashedPwd = await general.hashPwd(pwd);
  const { err, createRes } = await teacher.create({
    username,
    first_name,
    last_name,
    password: hashedPwd,
    customer,
  });
  if (err) {
    const { statusCode, msg } = general.getStatus(err);
    return res.status(statusCode).send({ msg });
  }
  return res.send(createRes);
});

router.patch("/code", async (req, res) => {
  const username = req.body.username;
  const customer_id = req.body.customer_id;
  const salary = req.body.salary;
  const state = req.body.state;
  const city = req.body.city;
  const min = req.body.min;
  const max = req.body.max;

  const { createErr, createRes } = await teacher.createCode({
    username,
    customer_id,
    salary,
    state,
    city,
    min,
    max,
  });
  if (createErr) {
    const { statusCode, msg } = general.getStatus(createErr);
    return res.status(statusCode).send({ msg });
  }
  res.send(createRes);
});

router.delete("/remove_code", async (req, res) => {
  const username = req.body.username;
  const code = req.body.code;

  const { msg, statusCode } = await teacher.deleteCode(username, code);

  res.status(statusCode).send(msg);
});

router.patch("/update", async (req, res) => {
  const username = req.body.username;
  const update = req.body.update;

  const { updateRes } = await teacher.updateOne({ username }, update);
  res.send(updateRes);
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const pwd = req.body.password;

  const { err, findOneRes } = await teacher.findOne(
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

router.post("/send_event/:class_code", async (req, res) => {
  const code = req.params.class_code;

  const { classErr, classRes } = await class_.findOne(
    { code },
    { _id: 0, __v: 0 }
  );
  if (classErr) {
    const { statusCode, msg } = general.getStatus(classErr);
    return res.status(statusCode).send({ msg });
  }

  const { students } = classRes;
  students.forEach(async (currStudent) => {
    const { taskErr, taskRes } = await task.findOne(
      { name: "all_tasks" },
      { _id: 0, tasks: 1 }
    );
    if (taskErr) {
      const { statusCode, msg } = general.getStatus(taskErr);
      return res.status(statusCode).send({ msg });
    }

    const { tasks } = taskRes;
    const index = Math.floor(Math.random() * tasks.length);
    const randomTask = tasks[index];
    const { requirements, event, amount } = randomTask;

    if (requirements.includes("house")) {
      if (!currStudent.house) {
        var choosenEvent = {
          event: "You got in an accident and had to pay $500 dollars",
          amount: 500,
        };
      } else {
        if (currStudent.house.price < 150000) {
          var choosenEvent = { event, amount: amount * 1.5 };
        } else {
          var choosenEvent = { event, amount };
        }
      }
    } else {
      var choosenEvent = { event, amount };
    }

    const { err, findOneRes } = student.updateOne(
      { username: currStudent.username },
      { event: choosenEvent }
    );
    if (err) {
      const { statusCode, msg } = general.getStatus(err);
      return res.status(statusCode).send({ msg });
    }
  });
  return res.send({ msg: "Events sent" });
});

module.exports = router;
