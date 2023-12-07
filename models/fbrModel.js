const mongoose = require("mongoose");

const cnicSchema = new mongoose.Schema({
  cnic: {
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

const paidElectricityBillSchema = new mongoose.Schema({
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

const businessLetterHeadSchema = new mongoose.Schema({
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

const propertyPapersSchema = new mongoose.Schema({
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
const fbrSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  cnic: cnicSchema,
  propertyPapers: propertyPapersSchema,
  paidElectricityBill: paidElectricityBillSchema,
  businessLetterHead: businessLetterHeadSchema,

  contactNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  natureOfBusiness: {
    type: String,
    required: true,
  },
});

const Fbr = mongoose.model("Fbr", fbrSchema);

module.exports = Fbr;
