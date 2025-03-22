const express = require("express");
const scanController = require("../controllers/scanController"); // Ensure this import is correct

const router = express.Router();

// Route to start a scan
router.post("/start", scanController.startScan);

// Route to get a scan report
router.get("/:id", scanController.getScanReport);

// Route to perform excessive scanning
router.post("/excessiveCheck", scanController.performExcessiveScan);

module.exports = router;
