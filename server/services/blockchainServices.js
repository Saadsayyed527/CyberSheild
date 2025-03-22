const axios = require("axios");
const FormData = require("form-data");

// Upload scan report to IPFS
exports.uploadToIPFS = async (data) => {
    try {
        const formData = new FormData();
        formData.append("file", JSON.stringify(data));

        const response = await axios.post("https://ipfs.infura.io:5001/api/v0/add", formData, {
            headers: formData.getHeaders(),
            auth: {
                username: process.env.INFURA_PROJECT_ID,
                password: process.env.INFURA_PROJECT_SECRET
            }
        });

        return response.data.Hash;
    } catch (error) {
        console.error("Error uploading to IPFS:", error);
        throw new Error("Failed to upload to IPFS");
    }
};
