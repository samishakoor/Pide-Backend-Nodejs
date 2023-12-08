const mongoose = require("mongoose");

const cnicOfSignoratorySchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const letterHeadSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const proofOfNtnSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const rubberStampSchema = new mongoose.Schema({
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

const certificateOfRegistrationSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const proofOfBusinessAddressSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const affidavitSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const memorandumOfAssociationSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const bankSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
