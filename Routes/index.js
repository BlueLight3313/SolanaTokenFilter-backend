const express = require("express");
const router = express.Router();
const controllerIndex = require("../Controllers/controller-index");

router.get("/webhooks", controllerIndex.indexView);

module.exports = router;
