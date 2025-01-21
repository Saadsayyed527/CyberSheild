const pdfGenerator = require('../utils/scanReportGenerator');
const Scan = require('../models/scanModel');

exports.generateReport = async (req, res) => {
    try {
        const scan = await Scan.findById(req.params.id);
        if (!scan || scan.userId !== req.userId) return res.status(404).json({ error: 'Scan not found' });

        const pdf = pdfGenerator.generate(scan);
        res.setHeader('Content-Disposition', 'attachment; filename=scan-report.pdf');
        res.contentType('application/pdf');
        res.send(pdf);
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate report' });
    }
};
