const Scan = require("../models/scanModel");
const scanReportGenerator = require("../utils/scanReportGenerator");
const { performSecurityScan } = require("../services/securityScanner");

// Function to start a scan
exports.startScan = async (req, res) => {
    const { url, userId } = req.body;
    try {
      if (!url || !userId) {
        console.error("Missing URL or userId");
        return res.status(400).json({ error: "URL and userId are required" });
      }
  
      const scan = new Scan({ url, userId, status: "In Progress", report: null });
      await scan.save();
  
      const report = await scanReportGenerator.generate(url);
      scan.status = "Completed";
      scan.report = report;
      await scan.save();
  
      res.status(201).json({ message: "Scan completed", scan });
    } catch (err) {
      console.error("Error in startScan:", err); // 👈 See this in terminal
      res.status(500).json({ error: "Error starting scan" });
    }
  };
  

// Function to get scan report by ID
exports.getScanReport = async (req, res) => {
    try {
        const scan = await Scan.findById(req.params.id);
        if (!scan) {
            return res.status(404).json({ error: "Scan not found" });
        }
        res.json(scan);
    } catch (err) {
        res.status(500).json({ error: "Error retrieving scan report" });
    }
};

// Function to perform an excessive security scan
exports.performExcessiveScan = async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ message: "URL is required" });
    }

    try {
        const scanResult = await performSecurityScan(url);
        return res.status(200).json({ message: "Excessive scan completed", result: scanResult });
    } catch (error) {
        return res.status(500).json({ message: "Error during scan", error: error.message });
    }
};
