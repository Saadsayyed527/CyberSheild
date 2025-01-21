const Scan = require('../models/scanModel');
const scanReportGenerator = require('../utils/scanReportGenerator');

// Function to start a scan
exports.startScan = async (req, res) => {
    const { url, userId } = req.body;
    try {
        const scan = new Scan({ url, userId, status: 'In Progress', report: null });
        await scan.save();

        const report = await scanReportGenerator.generate(url);
        scan.status = 'Completed';
        scan.report = report;
        await scan.save();

        res.status(201).json({ message: 'Scan completed', scan });
    } catch (err) {
        res.status(500).json({ error: 'Error starting scan' });
    }
};

// Function to get scan report by ID
exports.getScanReport = async (req, res) => {
    try {
        const scan = await Scan.findById(req.params.id);
        if (!scan) {
            return res.status(404).json({ error: 'Scan not found' });
        }
        res.json(scan);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving scan report' });
    }
};

// Function to return more details in a neat and readable format
exports.moreDetails = async (req, res) => {
    try {
        const scan = await Scan.findById(req.params.id);
        if (!scan) {
            return res.status(404).json({ error: 'Scan not found' });
        }

        // Format the response
        const formattedReport = `
        **Scan Report for ${scan.url}**:

        **Performance:**
        - Page size: ${scan.report.match(/Page size: (.*) bytes/)[1]} bytes
        - Response time: ${scan.report.match(/Response time: (.*)ms/)[1]}ms
        - HTTPS: ${scan.report.includes('HTTPS: Enabled') ? 'Enabled' : 'Not enabled (Insecure)'}

        **Security:**
        - X-Frame-Options: ${scan.report.includes('X-Frame-Options: Present') ? 'Present (Good)' : 'Missing (Bad)'}
        - X-Content-Type-Options: ${scan.report.includes('X-Content-Type-Options: Present') ? 'Present (Good)' : 'Missing (Bad)'}
        - Strict-Transport-Security: ${scan.report.includes('Strict-Transport-Security: Present') ? 'Present (Good)' : 'Missing (Bad)'}
        `;

        res.status(200).json({ 
            message: 'More details about the scan', 
            formattedReport: formattedReport.trim() 
        });
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving more details' });
    }
};


/*




// Route: /excessiveCheck
router.post('/excessiveCheck', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    const scanResult = await performExcessiveScan(url);
    return res.status(200).json({ message: 'Scan completed', result: scanResult });
  } catch (error) {
    return res.status(500).json({ message: 'Error during scan', error: error.message });
  }
});

// Route: /excessiveReport
router.post('/excessiveReport', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    const scanResult = await performExcessiveScan(url);

    // Formatting the report in a readable format
    const report = `
      Security Report for ${url}:
      - SSL/TLS Check: ${scanResult.ssl.valid ? 'Valid' : 'Invalid'}
        Expiry Date: ${scanResult.ssl.valid ? scanResult.ssl.validTo : 'N/A'}
      
      - Security Headers:
        Content-Security-Policy: ${scanResult.headers['Content-Security-Policy']}
        X-Frame-Options: ${scanResult.headers['X-Frame-Options']}
        Strict-Transport-Security: ${scanResult.headers['Strict-Transport-Security']}
      
      - Open Ports:
        Port 80 (HTTP): ${scanResult.openPorts}

      - Outdated Libraries:
        ${scanResult.outdatedLibraries}
    `;

    return res.status(200).json({ message: 'Excessive Report', report: report });
  } catch (error) {
    return res.status(500).json({ message: 'Error during report generation', error: error.message });
  }
});
*/