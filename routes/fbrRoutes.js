const express = require("express");
const fbrController = require("./../controllers/fbrController");
const authenticateToken = require("./../middlewares/authenticateToken");

const router = express.Router();

router
  .route("/")
  .get(fbrController.getAllFbrDocuments)
  .post(authenticateToken,fbrController.createFbrDocuments);

router.route("/userDocs").get(authenticateToken,fbrController.getFbrDocuments);

module.exports = router;
