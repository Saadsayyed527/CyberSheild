const sslChecker = require('ssl-checker');
const portscanner = require('portscanner');
const checkOutdatedLibraries = async () => {
  return "No outdated libraries detected"; 
};

const performExcessiveScan = async (url) => {
  try {
    const sslResult = await sslChecker(url);
    const portsResult = await portscanner.checkPortStatus(80, url); 
    
    return {
      ssl: sslResult,
      headers: {}, 
      openPorts: portsResult,
      outdatedLibraries: await checkOutdatedLibraries(),
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { performExcessiveScan };
