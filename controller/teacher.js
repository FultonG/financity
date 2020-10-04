const jwt = require("jsonwebtoken");
const Teacher = require("../models/teachers");
const finance = require("./finance");
const class_ = require("./class");

async function create(data) {
  let res = {};
  try {
    const { customerErr, customerRes } = await finance.customer({
      address: data.customer,
      first_name: data.first_name,
      last_name: data.last_name,
    });
    if (customerErr) {
      throw new Error(customerErr);
    }
    console.log({ ...data, customer: customerRes });
    await Teacher.create({ ...data, customer: customerRes });
    const { err, findOneRes } = await findOne(
      { username: data.username },
      {
        _id: 0,
        __v: 0,
        password: 0,
      }
    );
    if (err) {
      throw new Error(err);
    }

    const token = jwt.sign({ user: findOneRes }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res = { err, createRes: { user: findOneRes, token } };
  } catch (err) {
    res = { err, createRes: null };
  }
  return res;
}

async function findOne(data, filter) {
  let res = {};
  try {
    let findOneRes = await Teacher.findOne(data).select(filter);
    if (!findOneRes) {
      throw new Error("Username not in database");
    }

    findOneRes = findOneRes.toObject();
    res = { err: null, findOneRes };
  } catch (err) {
    res = { err, findOneRes: null };
  }
  return res;
}

async function updateOne(data, update) {
  let res = {};
  try {
    await Teacher.updateOne(data, update);
    const { err, findOneRes } = await findOne(data, {
      _id: 0,
      __v: 0,
      password: 0,
    });
    res = { err, updateRes: findOneRes };
  } catch (err) {
    res = { err, updateRes: null };
  }
  return res;
}

async function createCode(data) {
  const length = 6;
  const chars = "ABCDEFGHIJKLMNOPQRTSUVWXYZ1234567890";
  let code;
  do {
    code = "";
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while ((await class_.findOne({ classrooms: code }, {})).findOneRes);

  const { err, updateRes } = await updateOne(
    { username: data.username },
    { $push: { classrooms: code } },
    { _id: 0, __v: 0, password: 0 }
  );
  if (err) {
    return { createErr: err, createRes: null };
  }

  const { createErr, createRes } = await class_.create({
    code,
    customer_id: data.customer_id,
    salary: data.salary,
    state: data.state,
    city: data.city,
    min: data.min,
    max: data.max,
  });
  if (createErr) {
    return { createErr: createErr, createRes: null };
  }
  return { createRes: { user: updateRes, class: createRes }, createErr: null };
}

async function deleteCode(username, code) {
  const { err, updateRes } = await updateOne(
    { username },
    { $pull: { classrooms: code } },
    { _id: 0, __v: 0, password: 0 }
  );

  if (err) {
    return { msg: err, statusCode: 500 };
  }
  return { msg: updateRes, statusCode: 200 };
}

module.exports = { create, findOne, updateOne, createCode, deleteCode };
