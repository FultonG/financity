const mongoose = require("mongoose");
const { schema } = require("./jobs");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const SolvedQuestionsSchema = mongoose.Schema({
  question_id: {
    type: String,
    required: [true, "Please provide a question id"],
  },
  date_completed: {
    type: String,
    required: [true, "Please provide the date the question was completed"],
  },
});

const StudentSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  first_name: {
    type: String,
    required: [true, "Please provide a first name"],
  },
  last_name: {
    type: String,
    required: [true, "Please provide a last name"],
  },
  classroom_id: {
    type: String,
    required: [true, "Please provide a classroom ID"],
  },
  job: { type: schema, required: false },
  questions_solved: { type: Array(SolvedQuestionsSchema), required: false },
  solved: { type: Number, default: 0, required: false },
  question: { type: String, required: false },
  goal: { type: Number, default: 5, required: false },
  account: { type: Object, required: false },
});

const Student = (module.exports = mongoose.model(
  "Student",
  StudentSchema,
  "Students"
));
