const axios = require("axios");
const class_ = require("./class");
const REALTOR_API = process.env.REALTOR_API;

async function house(data) {
  const { code, ...house } = data;
  const { classErr, classRes } = await class_.findOne(
    { code },
    { _id: 0, __v: 0 }
  );
  if (classErr) {
    const { msg, statusCode } = general.getStatus(classErr);
  }

  const { city, state } = classRes;

  const { houseErr, houseRes } = await axios
    .get("https://realtor.p.rapidapi.com/properties/v2/list-for-sale", {
      headers: {
        "x-rapidapi-host": "realtor.p.rapidapi.com",
        "x-rapidapi-key": REALTOR_API,
        useQueryString: true,
      },
      params: {
        ...house,
        city,
        state_code: state,
      },
    })
    .then((res) => {
      return { houseErr: null, houseRes: res.data };
    })
    .catch((err) => {
      return { houseErr: err, houseRes: null };
    });
  if (houseErr) {
    return { houseErr, houseRes };
  }

  let response = [];
  const { properties } = houseRes;
  for (const property in properties) {
    const { beds, baths, price, address, thumbnail } = properties[property];
    response = [...response, { beds, baths, price, address, thumbnail }];
  }
  return { houseErr, houseRes: response };
}

async function getHouse(data) {
  return await axios
    .get("https://realtor.p.rapidapi.com/properties/v2/detail", {
      headers: {
        "x-rapidapi-host": "realtor.p.rapidapi.com",
        "x-rapidapi-key": REALTOR_API,
        useQueryString: true,
      },
      params: {
        property_id: data,
      },
    })
    .then((res) => {
      const properties = res.data.properties;
      if (!properties) {
        return { houseErr: new Error("Invalid property id"), houseRes: null };
      }

      const property = properties[0];

      let {
        description,
        address,
        price,
        baths,
        beds,
        thumbnail,
        mortgage,
      } = property;
      if (!thumbnail) {
        thumbnail =
          "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg";
      }

      const monthly_expense = mortgage.estimate.monthly_payment;

      const { city, line, state_code, state } = address;
      address = { city, line, state_code, state };

      return {
        houseErr: null,
        houseRes: {
          description,
          address,
          price,
          baths,
          beds,
          thumbnail,
          monthly_expense,
        },
      };
    })
    .catch((err) => {
      return { houseErr: err, houseRes: null };
    });
}

module.exports = { house, getHouse };
