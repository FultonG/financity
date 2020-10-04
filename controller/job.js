const { model } = require("../models/jobs");

async function find(data, filter) {
  let res = {};
  try {
    let findRes = await model.find(data).select(filter);
    if (!findRes) {
      throw new Error("Job not in database");
    }
    res = { err: null, findRes };
  } catch (err) {
    res = { err, findRes: null };
  }
  return res;
}

async function findById(data, filter) {
  let res = {};
  try {
    let findByIdRes = await model.findById(data).select(filter);
    if (!findByIdRes) {
      throw new Error("Job not in database");
    }

    findByIdRes = findByIdRes.toObject();
    res = { err: null, findByIdRes };
  } catch (err) {
    res = { err, findByIdRes: null };
  }
  return res;
}

module.exports = { find, findById };
