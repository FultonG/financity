const axios = require("axios");
const CAPITAL_API = process.env.CAPITAL_API;

async function customer(data) {
  return await axios
    .post(`http://api.reimaginebanking.com/customers?key=${CAPITAL_API}`, data)
    .then((res) => {
      const { _id, ...customer } = res.data.objectCreated;
      return {
        customerErr: null,
        customerRes: { ...customer, customer_id: _id },
      };
    })
    .catch((err) => {
      return { customerErr: err, customerRes: null };
    });
}

async function account(data) {
  const { customer_id, ...account } = data;

  return await axios
    .post(
      `http://api.reimaginebanking.com/customers/${customer_id}/accounts?key=${CAPITAL_API}`,
      account
    )
    .then((res) => {
      return {
        accountErr: null,
        accountRes: res.data.objectCreated,
      };
    })
    .catch((err) => {
      return { accountErr: err, accountRes: null };
    });
}

async function purchase(data) {
  const { account_id, ...purchase } = data;
  return await axios
    .post(
      `http://api.reimaginebanking.com/accounts/${account_id}/withdrawals?key=${CAPITAL_API}`,
      purchase
    )
    .then((res) => {
      console.log(res.data);
      return {
        purchaseErr: null,
        purchaseRes: res.data.objectCreated,
      };
    })
    .catch((err) => {
      return {
        purchaseErr: err,
        purchaseRes: null,
      };
    });
}

async function getAccount(data) {
  return await axios
    .get(`http://api.reimaginebanking.com/accounts/${data}?key=${CAPITAL_API}`)
    .then((res) => {
      return { accountErr: null, accountRes: res.data };
    })
    .catch((err) => {
      return { accountErr: err, accountRes: null };
    });
}

async function getAccounts(data) {
  return await axios
    .get(
      `http://api.reimaginebanking.com/customers/${data}/accounts?key=${CAPITAL_API}`
    )
    .then((res) => {
      return { accountErr: null, accountRes: res.data };
    })
    .catch((err) => {
      return { accountErr: err, accountRes: null };
    });
}

async function getPurchases(data) {
  return await axios
    .get(
      `http://api.reimaginebanking.com/accounts/${data}/withdrawals?key=${CAPITAL_API}`
    )
    .then((res) => {
      return { purchaseErr: null, purchaseRes: res.data };
    })
    .catch((err) => {
      return { purchaseErr: err, purchaseRes: null };
    });
}

async function deposit(data) {
  const { account_id, ...deposit } = data;
  return await axios
    .post(
      `http://api.reimaginebanking.com/accounts/${account_id}/deposits?key=${CAPITAL_API}`,
      deposit
    )
    .then((res) => {
      return { depositErr: null, depositRes: res.data.objectCreated };
    })
    .catch((err) => {
      return { depositErr: err, depositRes: null };
    });
}

async function getDeposits(data) {
  return await axios
    .get(
      `http://api.reimaginebanking.com/accounts/${data}/deposits?key=${CAPITAL_API}`
    )
    .then((res) => {
      return { depositErr: null, depositRes: res.data };
    })
    .catch((err) => {
      return { depositErr: err, depositRes };
    });
}

module.exports = {
  customer,
  account,
  purchase,
  getAccount,
  getAccounts,
  getPurchases,
  deposit,
  getDeposits,
};
