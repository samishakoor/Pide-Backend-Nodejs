const express = require("express");
const psebController = require("./../controllers/psebController");

const router = express.Router();

router
  .route("/")
  .get(psebController.getAllPsebDocuments)
  .post(psebController.createPsebDocuments);

router.route("/:id").get(psebController.getPsebDocuments);

module.exports = router;
