const mongoose = require("mongoose");

const JobsSchema = mongoose.Schema({
  title: { type: String, required: [true, "Please provide a job title"] },
  image: { type: String, required: false },
  description: {
    type: String,
    required: [true, "Please provide a job description"],
  },
  role: { type: String, required: [true, "Please provide a job role"] },
  next: { type: String, required: [true, "Please provide the next job role"] },
  question: {
    type: String,
    required: [true, "Please provide the first question"],
  },
  cost: { type: Number, required: [true, "Please provide cost for this job"] },
  level_desc: {
    type: String,
    required: [true, "Please provide a description for leveling up"],
  },
  minSalary: { type: Number, required: false },
  maxSalary: { type: Number, required: false },
});

const Job = (module.exports = {
  model: mongoose.model("Job", JobsSchema, "Jobs"),
  schema: JobsSchema,
});
