const mongoose = require("mongoose");

const checkSchema = new mongoose.Schema(
  {
    businessId: { type: String, required: true, index: true },
    businessName: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    isVisible: { type: Boolean, required: true },
    aiResponse: { type: String, required: true },
    fixes: [{ type: String }],
    competitorsMentioned: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Check", checkSchema);
