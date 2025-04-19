const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Setup multer for PDF upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route to upload PDF and get AI feedback
router.post('/upload-report', upload.single('report'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Parse PDF content
    const pdfData = await pdfParse(req.file.buffer);
    const pdfText = pdfData.text;

    // Send to Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      This is a security scan report. Please analyze it and provide suggestions on what could be improved or what potential risks are present.

      --- REPORT START ---
      ${pdfText}
      --- REPORT END ---
    `;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const feedback = await result.response.text();

    return res.status(200).json({ feedback });

  } catch (error) {
    console.error('AI Feedback Error:', error.message);
    return res.status(500).json({ error: 'Failed to analyze PDF.' });
  }
});

module.exports = router;
