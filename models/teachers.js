const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please provide a first name"],
    unique: false,
  },
  last_name: {
    type: String,
    required: [true, "Please provide a last name"],
    unique: false,
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  classrooms: { type: Array, required: false },
  customer: {
    address: {
      city: { type: String, required: [true, "Please provide a city"] },
      street_name: {
        type: String,
        required: [true, "Please provide a street name"],
      },
      street_number: {
        type: String,
        required: [true, "Please provide a street number"],
      },
      state: { type: String, required: [true, "Please provide a state"] },
      zip: { type: String, required: [true, "Please provide a zip"] },
    },
    customer_id: { type: String, required: false },
  },
});

const Teacher = (module.exports = mongoose.model(
  "Teacher",
  TeacherSchema,
  "Teachers"
));
