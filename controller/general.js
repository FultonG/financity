const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

async function hashPwd(pwd) {
  if (!pwd) {
    return "";
  }
  return await bcrypt.hash(pwd, saltRounds);
}

async function comparePwd(pwd, hashedPwd) {
  return await bcrypt.compare(pwd, hashedPwd);
}

function createJwt(data) {
  const token = jwt.sign({ user: data }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
}

function getStatus(err) {
  console.log(err);
  if (err.index == 0) {
    return { statusCode: 400, msg: "Username already taken" };
  } else if (err.errors) {
    let msg = [];
    for (const errMsg in err.errors) {
      msg = [...msg, err.errors[errMsg].properties.message];
    }
    return { statusCode: 400, msg };
  } else if (err.message == "Invalid classroom code") {
    return { statusCode: 400, msg: err.message };
  } else if (err.message == "Username not in database") {
    return { statusCode: 400, msg: err.message };
  }
  return { statusCode: 500, msg: err.message };
}

module.exports = { hashPwd, comparePwd, createJwt, getStatus };
