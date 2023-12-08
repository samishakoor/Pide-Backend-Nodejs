const express = require("express");
const bankController = require("./../controllers/bankController");
const authenticateUser = require("./../middlewares/userAuth");
const router = express.Router();

router
  .route("/")
  .get(bankController.getAllBankDocuments)
  .post(authenticateUser, bankController.createBankDocuments);

router
  .route("/userDocs")
  .get(authenticateUser, bankController.getBankDocuments);

module.exports = router;
