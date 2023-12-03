const express = require("express");
const bankController = require("./../controllers/bankController");
const router = express.Router();

router
  .route("/")
  .get(bankController.getAllBankDocuments)
  .post(bankController.createBankDocuments);

router.route("/:id").get(bankController.getBankDocuments);

module.exports = router;
