const pdfGenerator = require('../utils/scanReportGenerator');
const Scan = require('../models/scanModel');

exports.generateReport = async (req, res) => {
  try {
    // 🆕 Find the most recent scan by the user
    const scan = await Scan.findOne({ userId: req.userId }).sort({ createdAt: -1 });

    if (!scan) {
      return res.status(404).json({ error: 'No scan found for user' });
    }

    const pdf = pdfGenerator.generate(scan);
    res.setHeader('Content-Disposition', 'attachment; filename=scan-report.pdf');
    res.contentType('application/pdf');
    res.send(pdf);
  } catch (err) {
    console.error('PDF generation error:', err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};
