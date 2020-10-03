const mongoose = require("mongoose");

const QuestionsSchema = mongoose.Schema({
  job: { type: String, required: [true, "Please provide a job"] },
  description: {
    type: String,
    required: [true, "Please provide a question description"],
  },
  image: { type: String, required: false },
  video: { type: String, required: false },
  question: { type: String, required: [true, "Please provide a question"] },
  options: { type: Array, required: [true, "Please provide question options"] },
  answer: { type: String, required: [true, "Please provide an answer"] },
  next: { type: String, required: false },
  pay: { type: Number, required: [true, "Please provide a pay"] },
});

const Question = (module.exports = mongoose.model(
  "Question",
  QuestionsSchema,
  "Questions"
));
