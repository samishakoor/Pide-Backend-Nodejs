const mongoose = require("mongoose");

const cnicOfSignoratorySchema = new mongoose.Schema({
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

const letterHeadSchema = new mongoose.Schema({
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

const proofOfNtnSchema = new mongoose.Schema({
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

const rubberStampSchema = new mongoose.Schema({
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

const certificateOfRegistrationSchema = new mongoose.Schema({
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

const proofOfBusinessAddressSchema = new mongoose.Schema({
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

const affidavitSchema = new mongoose.Schema({
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

const memorandumOfAssociationSchema = new mongoose.Schema({
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

const bankSchema = new mongoose.Schema({
  cnicOfSignoratory: cnicOfSignoratorySchema,
  letterHead: letterHeadSchema,
  proofOfNtn: proofOfNtnSchema,
  partnershipDeed: partnershipDeedSchema,
  rubberStamp: rubberStampSchema,
  certificateOfRegistration: certificateOfRegistrationSchema,
  proofOfBusinessAddress: proofOfBusinessAddressSchema,
  affidavit: affidavitSchema,
  memorandumOfArticles: memorandumOfAssociationSchema,

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

const Bank = mongoose.model("Bank", bankSchema);

module.exports = Bank;
