const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  analyzeRoute,
  compareRoutes,
  getRecommendations,
} = require("../controllers/aiController");

router.post("/analyze", protect, analyzeRoute);
router.post("/compare-routes", protect, compareRoutes);
router.get("/recommendations", protect, getRecommendations);

module.exports = router;
