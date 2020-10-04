const Task = require("../models/tasks");

async function findOne(data, filter) {
  try {
    const taskRes = await Task.findOne(data).select(filter);
    return { taskErr: null, taskRes };
  } catch (taskErr) {
    return { taskErr, taskRes: null };
  }
}

module.exports = { findOne };
