const mongoose = require("mongoose");

const cnicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

const memorandumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});
const complianceFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});
const feeChallanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

const secpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cnic: cnicSchema,
  memorandum: memorandumSchema,
  feeChallan: feeChallanSchema,
  complianceForm: complianceFormSchema,
  officeAddress: {
    type: String,
    required: true,
  },
  telephoneNumber: {
    type: String,
    required: true,
  },
  director1: {
    type: String,
    required: true,
  },
  director2: {
    type: String,
    required: true,
  },
  director3: {
    type: String,
    required: true,
  },
});

const Secp = mongoose.model("Secp", secpSchema);

module.exports = Secp;
