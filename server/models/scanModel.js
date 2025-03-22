const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({
    url: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["In Progress", "Completed"], default: "In Progress" },
    report: { type: Object },
    blockchainHash: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Scan", scanSchema);
