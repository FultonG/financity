const student = require("./student");
const teacher = require("./teacher");
const realtor = require("./realtor");
const class_ = require("./class");
const job = require("./job");
const question = require("./question");
const stock = require("./stock");

const account = require("./finance/account");
const deposit = require("./finance/deposit");
const purchase = require("./finance/purchase");
const customer = require("./finance/customer");

module.exports = {
  student,
  teacher,
  account,
  deposit,
  purchase,
  customer,
  realtor,
  class_,
  job,
  question,
  stock,
};
