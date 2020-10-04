const Question = require("../models/questions");

async function findById(data, filter) {
  let res = {};
  try {
    let findByIdRes = await Question.findById(data).select(filter);
    if (!findByIdRes) {
      throw new Error("Question not in database");
    }
    findByIdRes = findByIdRes.toObject();
    res = { err: null, findByIdRes };
  } catch (err) {
    res = { err, findByIdRes: null };
  }
  return res;
}

module.exports = { findById };
