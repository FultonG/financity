const jwt = require("jsonwebtoken");
const Student = require("../models/students");
const finance = require("./finance");
const class_ = require("./class");
const job = require("./job");

async function create(data) {
  let res = {};
  try {
    const { classErr, classRes } = await class_.findOne(
      { code: data.classroom_id },
      {}
    );
    if (classErr) {
      throw new Error(classErr);
    } else if (!classRes) {
      throw new Error("Invalid classroom code");
    }

    const customer_id = classRes.customer_id;
    const salary = classRes.salary;
    const min = classRes.min;
    const max = classRes.max;
    let balance;
    if (salary) {
      balance = salary;
    } else if (min && max) {
      const rndNumber = Math.floor(Math.random() * max) + min;
      balance = rndNumber;
    } else {
      balance = 500;
    }

    const { accountErr, accountRes } = await finance.account({
      customer_id,
      type: "Checking",
      nickname: data.username,
      rewards: 0,
      balance,
    });
    if (accountErr) {
      throw new Error(accountErr);
    }

    const userData = { ...data, account: accountRes };
    await Student.create(userData);
    const { err, findOneRes } = await findOne(data, {
      _id: 0,
      __v: 0,
      password: 0,
    });
    if (err) {
      throw new Error(err);
    }

    const { addErr, addRes } = await class_.addStudent({
      class_code: data.classroom_id,
      username: data.username,
      account_id: accountRes._id,
    });
    if (addErr) {
      throw new Error(addErr);
    }

    const token = jwt.sign({ findOneRes }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res = { err: null, createRes: { user: findOneRes, token } };
  } catch (err) {
    res = { err, createRes: null };
  }
  return res;
}

async function findOne(data, filter) {
  let res = {};
  try {
    let findOneRes = await Student.findOne(data).select(filter);
    if (!findOneRes) {
      throw new Error("Username not in database");
    }
    findOneRes = findOneRes.toObject();

    const { _id } = findOneRes.account;
    const { accountErr, accountRes } = await finance.getAccount(_id);
    if (accountErr) {
      throw accountErr;
    }

    res = { err: null, findOneRes: { ...findOneRes, account: accountRes } };
  } catch (err) {
    res = { err, findOneRes: null };
  }
  return res;
}

async function updateOne(data, update) {
  let res = {};
  try {
    await Student.updateOne(data, update);
    const { err, findOneRes } = await findOne(data, {
      _id: 0,
      __v: 0,
      password: 0,
    });
    res = { updateErr: null, updateRes: findOneRes };
  } catch (err) {
    res = { updateErr: err, updateRes: null };
  }
  return res;
}

async function setJob(data) {
  const { err, findByIdRes } = await job.findById(
    { _id: data._id },
    { __v: 0 }
  );
  if (err) {
    return { jobErr: err, jobRes: null };
  }

  const { updateErr, updateRes } = await updateOne(
    { username: data.username },
    { job: findByIdRes }
  );
  if (updateErr) {
    return { jobErr: updateErr, jobRes: null };
  }

  return { jobErr: null, jobRes: updateRes };
}

module.exports = {
  create,
  findOne,
  setJob,
  updateOne,
};
