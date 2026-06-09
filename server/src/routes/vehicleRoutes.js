const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createVehicle,
  getVehicles,
} = require("../controllers/vehicleController");

router.route("/").post(protect, createVehicle).get(protect, getVehicles);

module.exports = router;
