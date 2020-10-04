const Class = require("../models/classes");

async function create(data) {
  let res = {};
  try {
    await Class.create(data);
    const { classErr, classRes } = await findOne(data, {
      _id: 0,
      __v: 0,
    });
    res = { createErr: classErr, createRes: classRes };
  } catch (err) {
    res = { createErr: err, createRes: null };
  }
  return res;
}

async function find(data, filter) {
  let res = {};
  try {
    console.log(data);
    const classRes = await Class.find(data).select(filter);
    res = { classErr: null, classRes };
    console.log(classRes);
  } catch (err) {
    res = { classErr: err, classRes: null };
  }
  return res;
}

async function findOne(data, filter) {
  let res = {};
  try {
    const classRes = await Class.findOne(data).select(filter);
    res = { classErr: null, classRes };
  } catch (err) {
    res = { classErr: err, classRes: null };
  }
  return res;
}

async function updateOne(data, update) {
  let res = {};
  try {
    await Class.updateOne(data, update);
    const { classErr, classRes } = await findOne(data, {
      _id: 0,
      __v: 0,
    });
    res = { err: classErr, updateRes: classRes };
  } catch (err) {
    res = { err, updateRes: null };
  }
  return res;
}

async function addStudent(data) {
  const { err, updateRes } = await updateOne(
    { code: data.class_code },
    {
      $push: {
        students: { username: data.username, account_id: data.account_id },
      },
    }
  );
  return { addErr: err, addRes: updateRes };
}

async function removeStudent(data) {
  const { err, updateRes } = await updateOne(
    { code: data.class_code },
    {
      $pull: {
        students: { username: data.username, account_id: data.account_id },
      },
    }
  );
  return { addErr: err, addRes: updateRes };
}

module.exports = { find, findOne, create, addStudent, removeStudent };
