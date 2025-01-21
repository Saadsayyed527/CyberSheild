const axios = require('axios');

exports.generate = async (url) => {
    let report = `Report for ${url}:\n`;

    try {
        const startTime = Date.now();

        const response = await axios.get(url);

        const duration = Date.now() - startTime; 

        const contentLength = parseInt(response.headers['content-length'] || '0');
        report += `- Performance:\n`;
        report += contentLength > 500000 ? `  - Page size: ${contentLength} bytes (Large)\n` : `  - Page size: ${contentLength} bytes (Optimal)\n`;
        report += duration > 3000 ? `  - Response time: ${duration}ms (Slow)\n` : `  - Response time: ${duration}ms (Good)\n`;

        const isHTTPS = url.startsWith('https');
        report += isHTTPS ? `  - HTTPS: Enabled\n` : `  - HTTPS: Not enabled (Insecure)\n`;

        const headers = response.headers;
        report += `- Security:\n`;
        report += headers['x-frame-options'] ? `  - X-Frame-Options: Present (Good)\n` : `  - X-Frame-Options: Missing (Bad)\n`;
        report += headers['x-content-type-options'] ? `  - X-Content-Type-Options: Present (Good)\n` : `  - X-Content-Type-Options: Missing (Bad)\n`;
        report += headers['strict-transport-security'] ? `  - Strict-Transport-Security: Present (Good)\n` : `  - Strict-Transport-Security: Missing (Bad)\n`;

    } catch (error) {
        report += `- Error: Could not scan the website. It may not be accessible or there might be an issue with the URL.\n`;
    }

    return report;
};
