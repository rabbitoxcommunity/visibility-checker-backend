const express = require("express");
const router = express.Router();
const Check = require("../models/Check");
const { runVisibilityCheck } = require("../services/aiCheck");

// POST /api/check
router.post("/", async (req, res) => {
  const { businessName, location, category, businessId } = req.body;

  if (!businessName || !location || !category) {
    return res
      .status(400)
      .json({ error: "businessName, location, and category are required." });
  }

  const id =
    businessId ||
    `${businessName.toLowerCase().replace(/\s+/g, "-")}-${location
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

  try {
    const result = await runVisibilityCheck({ businessName, location, category });

    const saved = await Check.create({
      businessId: id,
      businessName,
      location,
      category,
      isVisible: result.isVisible,
      aiResponse: result.aiResponse,
      fixes: result.fixes,
      competitorsMentioned: result.competitorsMentioned,
    });

    res.json({ businessId: id, ...result, savedAt: saved.createdAt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Check failed.", detail: err.message });
  }
});

// GET /api/check/history/:businessId
router.get("/history/:businessId", async (req, res) => {
  try {
    const checks = await Check.find({ businessId: req.params.businessId })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(checks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch history." });
  }
});

module.exports = router;
