const mongoose = require("mongoose");

const cnicOfDirectorSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const incorporationCertificateSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const copyOfMouSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const partnershipDeedSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const firmRegistrationCertificateSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const feeChallanSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const businessBankStatementSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const psebSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  cnicOfDirector: cnicOfDirectorSchema,
  incorporationCertificate: incorporationCertificateSchema,
  copyOfMou: copyOfMouSchema,
  partnershipDeed: partnershipDeedSchema,
  firmRegistrationCertificate: firmRegistrationCertificateSchema,
  feeChallan: feeChallanSchema,
  businessBankStatement: businessBankStatementSchema,
});

const Pseb = mongoose.model("Pseb", psebSchema);

module.exports = Pseb;
