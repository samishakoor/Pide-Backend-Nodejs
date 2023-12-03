const express = require("express");
const secpController = require("./../controllers/secpController");

const router = express.Router();

router
  .route("/")
  .get(secpController.getAllSecpDocuments)
  .post(secpController.createSecpDocuments);

router.route("/:id").get(secpController.getSecpDocuments);

module.exports = router;
