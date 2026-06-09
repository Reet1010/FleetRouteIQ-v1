const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getInsights,
} = require("../controllers/dashboardController");

router.get("/stats", protect, getDashboardStats);
router.get("/insights", protect, getInsights);
router.get("/test", (req, res) => {
  res.json({
    success: true,
  });
});

module.exports = router;
