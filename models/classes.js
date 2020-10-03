const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const ClassesSchema = mongoose.Schema({
  code: {
    type: String,
    required: [true, "Please provide a class code"],
    unique: true,
  },
  students: {
    type: Array,
    required: false,
  },
  customer_id: {
    type: String,
    required: [true, "Please provide a customer id"],
  },
  salary: {
    type: Number,
    required: false,
  },
  min: {
    type: Number,
    required: false,
  },
  max: {
    type: Number,
    required: false,
  },
  city: {
    type: String,
    required: [true, "Please provide a city"],
  },
  state: {
    type: String,
    required: [true, "Please provide a state"],
  },
});

const Class = (module.exports = mongoose.model(
  "Class",
  ClassesSchema,
  "Classes"
));
