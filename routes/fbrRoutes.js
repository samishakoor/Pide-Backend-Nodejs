const express = require("express");
const fbrController = require("./../controllers/fbrController");

const router = express.Router();

router
  .route("/")
  .get(fbrController.getAllFbrDocuments)
  .post(fbrController.createFbrDocuments);

router.route("/:id").get(fbrController.getFbrDocuments);

module.exports = router;
