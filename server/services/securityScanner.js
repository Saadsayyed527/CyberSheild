const axios = require("axios");
const { exec } = require("child_process");

exports.performSecurityScan = async (url) => {
    try {
        console.log(`🔍 Scanning: ${url}`);

        // Fetch security headers
        const response = await axios.get(url, { timeout: 5000 });

        // Extract headers
        const headers = response.headers;

        // Check SSL certificate (using OpenSSL)
        const sslCheck = new Promise((resolve) => {
            exec(`echo | openssl s_client -connect ${url.replace("https://", "")}:443 -servername ${url} 2>/dev/null | openssl x509 -noout -dates`, (err, stdout) => {
                if (err) {
                    resolve({ valid: false, validTo: "N/A" });
                } else {
                    const expiryDate = stdout.match(/notAfter=(.*)/)?.[1] || "Unknown";
                    resolve({ valid: true, validTo: expiryDate });
                }
            });
        });

        // Simulate outdated libraries check
        const outdatedLibraries = [
            "jQuery v1.12.4 (Deprecated)",
            "Bootstrap v3.3.7 (Update to v5)"
        ];

        // Check open ports (simplified for demo)
        const openPorts = [80, 443].filter(port => Math.random() > 0.5);

        // Wait for SSL check to complete
        const ssl = await sslCheck;

        return {
            ssl,
            headers: {
                "Content-Security-Policy": headers["content-security-policy"] || "Not Set",
                "X-Frame-Options": headers["x-frame-options"] || "Not Set",
                "Strict-Transport-Security": headers["strict-transport-security"] || "Not Set"
            },
            openPorts,
            outdatedLibraries
        };

    } catch (error) {
        console.error("🚨 Security Scan Error:", error.message);
        return { error: "Failed to scan website" };
    }
};
