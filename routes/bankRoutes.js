const express = require("express");
const bankController = require("./../controllers/bankController");
const authenticateToken = require("./../middlewares/authenticateToken");
const router = express.Router();

router
  .route("/")
  .get(bankController.getAllBankDocuments)
  .post(authenticateToken, bankController.createBankDocuments);

router.route("/userDocs").get(authenticateToken, bankController.getBankDocuments);

module.exports = router;
