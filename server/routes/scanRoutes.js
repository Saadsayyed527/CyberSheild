const express = require('express');
const scanController = require('../controllers/scanController'); // Ensure this import is correct
const router = express.Router();

// const { performScan } = require('../controllers/scanController');
// const { performExcessiveScan } = require('../utils/excessiveScan');
// Define routes correctly
router.post('/start', scanController.startScan);    // Correct route handler
router.get('/:id', scanController.getScanReport);   // Correct route handler
router.get('/moreDetails/:id', scanController.moreDetails);

// router.post('/', performScan);


// // Route: /excessiveCheck
// router.post('/excessiveCheck', async (req, res) => {
//     const { url } = req.body;
  
//     if (!url) {
//       return res.status(400).json({ message: 'URL is required' });
//     }
  
//     try {
//       const scanResult = await performExcessiveScan(url);
//       return res.status(200).json({ message: 'Scan completed', result: scanResult });
//     } catch (error) {
//       return res.status(500).json({ message: 'Error during scan', error: error.message });
//     }
//   });
  
//   // Route: /excessiveReport
//   router.post('/excessiveReport', async (req, res) => {
//     const { url } = req.body;
  
//     if (!url) {
//       return res.status(400).json({ message: 'URL is required' });
//     }
  
//     try {
//       const scanResult = await performExcessiveScan(url);
  
//       // Formatting the report in a readable format
//       const report = `
//         Security Report for ${url}:
//         - SSL/TLS Check: ${scanResult.ssl.valid ? 'Valid' : 'Invalid'}
//           Expiry Date: ${scanResult.ssl.valid ? scanResult.ssl.validTo : 'N/A'}
        
//         - Security Headers:
//           Content-Security-Policy: ${scanResult.headers['Content-Security-Policy']}
//           X-Frame-Options: ${scanResult.headers['X-Frame-Options']}
//           Strict-Transport-Security: ${scanResult.headers['Strict-Transport-Security']}
        
//         - Open Ports:
//           Port 80 (HTTP): ${scanResult.openPorts}
  
//         - Outdated Libraries:
//           ${scanResult.outdatedLibraries}
//       `;
  
//       return res.status(200).json({ message: 'Excessive Report', report: report });
//     } catch (error) {
//       return res.status(500).json({ message: 'Error during report generation', error: error.message });
//     }
//   });


module.exports = router;
