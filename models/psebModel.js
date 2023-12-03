const mongoose = require("mongoose");


const cnicOfDirectorSchema = new mongoose.Schema({
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

const incorporationCertificateSchema = new mongoose.Schema({
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

const copyOfMouSchema = new mongoose.Schema({
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

const partnershipDeedSchema = new mongoose.Schema({
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



const firmRegistrationCertificateSchema = new mongoose.Schema({
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

const businessBankStatementSchema = new mongoose.Schema({
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


const psebSchema = new mongoose.Schema({
  cnicOfDirector: cnicOfDirectorSchema,
  incorporationCertificate: incorporationCertificateSchema,
  copyOfMou: copyOfMouSchema,
  partnershipDeed: partnershipDeedSchema,
  firmRegistrationCertificate:  firmRegistrationCertificateSchema,
  feeChallan: feeChallanSchema,
  businessBankStatement: businessBankStatementSchema,
});

const Pseb = mongoose.model("Pseb", psebSchema);

module.exports = Pseb;
