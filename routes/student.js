const {
  student,
  general,
  question,
  job,
  finance,
  realtor,
} = require("../controller");
const router = require("express").Router();
const yahooFinance = require("yahoo-finance");

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
    return res.send({ ...user, token });
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
    { _id: 0, __v: 0 }
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
      $inc: { solved: 1 },
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

router.get("/new_job/:username", async (req, res) => {
  const username = req.params.username;

  const { err, findOneRes } = await student.findOne(
    { username },
    { _id: 0, __v: 0 }
  );
  if (err) {
    const { statusCode, msg } = general.getStatus(err);
    return res.status(statusCode).send({ msg });
  }

  const { goal: currGoal, solved } = findOneRes;

  if (solved < currGoal) {
    return res
      .status(400)
      .send({ msg: "You have not solved enough questions" });
  }

  const minGoal = Math.floor(currGoal * 1.25);
  const maxGoal = Math.floor(currGoal * 2);

  const newGoal = Math.floor(Math.random() * (maxGoal - minGoal + 1) + minGoal);

  const { _id: oldJobId } = findOneRes.job;
  const { err: jobErr, findByIdRes: jobRes } = await job.findById({
    _id: oldJobId,
  });
  if (jobErr) {
    const { statusCode, msg } = general.getStatus(jobErr);
    return res.status(statusCode).send({ msg });
  }

  const { balance, _id: account_id } = findOneRes.account;
  const { cost, next: nextJobId } = jobRes;

  if (cost > balance) {
    return res.status(400).send({ msg: "Insufficient fund" });
  }

  const { purchaseErr, purchaseRes } = await finance.purchase({
    account_id,
    medium: "balance",
    amount: cost,
  });
  if (purchaseErr) {
    const { statusCode, msg } = general.getStatus(purchaseErr);
    return res.status(statusCode).send({ msg });
  }

  const { err: nextJobErr, findByIdRes: nextJobRes } = await job.findById({
    _id: nextJobId,
  });
  if (nextJobErr) {
    const { statusCode, msg } = general.getStatus(nextJobErr);
    return res.status(statusCode).send({ msg });
  }

  const { updateErr, updateRes } = await student.updateOne(
    { username },
    {
      job: nextJobRes,
      solved: 0,
      goal: newGoal,
    }
  );
  if (updateErr) {
    const { statusCode, msg } = general.getStatus(updateErr);
    return res.status(statusCode).send({ msg });
  }

  return res.send(updateRes);
});

router.post("/buy_house", async (req, res) => {
  const username = req.body.username;
  const property_id = req.body.property_id;

  const { houseErr, houseRes } = await realtor.getHouse(property_id);
  if (houseErr) {
    const { statusCode, msg } = general.getStatus(houseErr);
    return res.status(statusCode).send({ msg });
  }

  const { price, monthly_expense } = houseRes;

  const { err, findOneRes } = await student.findOne(
    { username },
    { _id: 0, __v: 0 }
  );
  if (err) {
    const { statusCode, msg } = general.getStatus(err);
    return res.status(statusCode).send({ msg });
  }

  const { account } = findOneRes;
  const { balance } = account;

  if (price > balance) {
    return res.status(400).send({ msg: "Insufficient funds" });
  }

  const { purchaseErr } = await finance.purchase({
    account_id: account._id,
    medium: "balance",
    amount: price,
  });
  if (purchaseErr) {
    const { statusCode, msg } = general.getStatus(purchaseErr);
    return res.status(statusCode).send({ msg });
  }

  const { updateErr, updateRes } = await student.updateOne(
    { username },
    { house: houseRes, $inc: { expenses: monthly_expense } }
  );
  if (updateErr) {
    const { statusCode, msg } = general.getStatus(updateErr);
    return res.status(statusCode).send({ msg });
  }

  return res.send(updateRes);
});

router.post("/buy_stock", async (req, res) => {
  const username = req.body.username;
  const ticker = req.body.ticker;
  const shares = req.body.shares;

  try {
    var quote = await yahooFinance.quote({
      symbol: ticker,
      modules: ["summaryDetail"],
    });
  } catch {
    return res.status(400).send({ msg: "Invalid ticker symbol" });
  }

  const price = 400;
  const amountInvested = shares * price;

  const { err, findOneRes } = await student.findOne(
    { username },
    { _id: 0, __v: 0 }
  );
  if (err) {
    const { statusCode, msg } = general.getStatus(err);
    return res.status(statusCode).send({ msg });
  }

  const { account, securities } = findOneRes;
  const { balance } = account;

  if (amountInvested > balance) {
    return res.status(400).send({ msg: "Insufficient funds" });
  }

  const { purchaseErr } = await finance.purchase({
    account_id: account._id,
    medium: "balance",
    amount: amountInvested,
  });
  if (purchaseErr) {
    const { statusCode, msg } = general.getStatus(purchaseErr);
    return res.status(statusCode).send({ msg });
  }

  const positionExists = securities.find(
    (position) => position.ticker == ticker
  );

  if (positionExists) {
    const { err, findOneRes } = await student.findOne(
      { username, "securities.ticker": ticker },
      { _id: 0 }
    );
    if (err) {
      const { statusCode, msg } = general.getStatus(err);
      return res.status(statusCode).send({ msg });
    }

    const { securities } = findOneRes;
    const position = securities.find((position) => position.ticker == ticker);
    const { buyHistory, amountInvested: currAmountInvested } = position;

    const { shares: totalShares } = buyHistory.reduce((total, addition) => ({
      shares: total.shares + addition.shares,
    }));

    console.log(totalShares);
    const avgPrice =
      (amountInvested + currAmountInvested) / (totalShares + shares);
    const { updateErr, updateRes } = await student.updateOne(
      { username, "securities.ticker": ticker },
      {
        "securities.$.sold": false,
        "securities.$.price": avgPrice,
        $inc: {
          "securities.$.shares": shares,
          "securities.$.amountInvested": amountInvested,
        },
        $push: {
          "securities.$.buyHistory": {
            dateBought: new Date(),
            price,
            shares,
          },
        },
      }
    );
    if (updateErr) {
      const { statusCode, msg } = general.getStatus(updateErr);
      return res.status(statusCode).send({ msg });
    }

    return res.send(updateRes);
  } else {
    const { updateErr, updateRes } = await student.updateOne(
      { username },
      {
        $push: {
          securities: {
            ticker,
            price,
            amountInvested,
            shares,
            buyHistory: [
              {
                dateBought: new Date(),
                price,
                shares,
              },
            ],
            sellHistory: [],
            sold: false,
          },
        },
      }
    );
    if (updateErr) {
      const { statusCode, msg } = general.getStatus(updateErr);
      return res.status(statusCode).send({ msg });
    }

    return res.send(updateRes);
  }
});

router.post("/sell_stock", async (req, res) => {
  const username = req.body.username;
  const ticker = req.body.ticker;
  const sellShares = req.body.shares;

  const { err, findOneRes } = await student.findOne(
    { username },
    { _id: 0, __v: 0 }
  );
  if (err) {
    const { statusCode, msg } = general.getStatus(err);
    return res.status(statusCode).send({ msg });
  }

  const { securities, account } = findOneRes;
  const holdsTicker = securities.some((position) => position.ticker == ticker);

  if (!holdsTicker) {
    return res.status(400).send({ msg: "You do not own this ticker symbol" });
  }

  try {
    var quote = await yahooFinance.quote({
      symbol: ticker,
      modules: ["summaryDetail"],
    });
  } catch {
    return res.status(400).send({ msg: "Invalid ticker symbol" });
  }

  const price = quote.summaryDetail.previousClose;
  let amountSelling = price * sellShares;

  const position = securities.find((position) => position.ticker == ticker);
  let { shares: heldShares, amountInvested, price: currPrice } = position;
  if (sellShares > heldShares) {
    return res
      .status(400)
      .send({ msg: `You own less than ${sellShares} shares` });
  }

  if (sellShares === heldShares) {
    const leftover = amountInvested - amountSelling;
    if (leftover > 0) {
      const { depositErr } = finance.purchase({
        account_id: account._id,
        medium: "balance",
        amount: leftover,
      });
      if (depositErr) {
        const { statusCode, msg } = general.getStatus(depositErr);
        return res.status(statusCode).send({ msg });
      }

      (currPrice = 0), (amountSelling = amountInvested);
    } else {
      const { depositErr } = finance.deposit({
        account_id: account._id,
        medium: "balance",
        amount: leftover,
      });
      if (depositErr) {
        const { statusCode, msg } = general.getStatus(depositErr);
        return res.status(statusCode).send({ msg });
      }

      (currPrice = 0), (amountSelling = amountInvested);
    }
  }

  const { updateErr, updateRes } = await student.updateOne(
    { username, "securities.ticker": ticker },
    {
      "securities.$.price": currPrice,
      "securities.$.sold": sellShares === heldShares,
      $inc: {
        "securities.$.shares": -sellShares,
        "securities.$.amountInvested": -amountSelling,
      },
      $push: {
        "securities.$.sellHistory": {
          dateSold: new Date(),
          price,
          shares: sellShares,
        },
      },
    }
  );
  if (updateErr) {
    const { statusCode, msg } = general.getStatus(updateErr);
    return res.status(statusCode).send({ msg });
  }

  const { depositErr } = finance.deposit({
    account_id: account._id,
    medium: "balance",
    amount: amountSelling,
  });
  if (depositErr) {
    const { statusCode, msg } = general.getStatus(depositErr);
    return res.status(statusCode).send({ msg });
  }

  return res.send(updateRes);
});

router.get("/stock_change/:username/:ticker", async (req, res) => {
  const username = req.params.username;
  const ticker = req.params.ticker;

  try {
    var quote = await yahooFinance.quote({
      symbol: ticker,
      modules: ["summaryDetail"],
    });
  } catch {
    return res.status(400).send({ msg: "Invalid ticker symbol" });
  }

  const price = quote.summaryDetail.previousClose;

  const { err, findOneRes } = await student.findOne(
    { username, "securities.ticker": ticker },
    { _id: 0, __v: 0 }
  );
  if (err) {
    const { statusCode, msg } = general.getStatus(err);
    return res.status(statusCode).send({ msg });
  }

  const positions = findOneRes.securities;
  const position = positions.find((position) => position.ticker === ticker);
  const { amountInvested, shares } = position;

  const change = (shares * price) / amountInvested;
  const percentChange = change > 1 ? (change - 1) * 100 : (1 - change) * -100;
  const percentChangeStr = String(percentChange) + "%";
  return res.send({ percentChange: percentChangeStr });
});

module.exports = router;
