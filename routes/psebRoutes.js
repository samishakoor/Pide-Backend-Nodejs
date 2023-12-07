const express = require("express");
const authenticateToken = require("./../middlewares/authenticateToken");
const psebController = require("./../controllers/psebController");
const router = express.Router();

router
  .route("/")
  .get(psebController.getAllPsebDocuments)
  .post(authenticateToken, psebController.createPsebDocuments);

router
  .route("/userDocs")
  .get(authenticateToken, psebController.getPsebDocuments);

module.exports = router;
