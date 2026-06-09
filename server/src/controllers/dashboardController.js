const Vehicle = require("../models/Vehicle");

const getDashboardStats = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      owner: req.user._id,
    });

    const activeVehicles = vehicles.length;

    const totalDistance = vehicles.reduce(
      (sum, vehicle) => sum + vehicle.distanceTravelled,
      0,
    );

    const totalFuel = vehicles.reduce(
      (sum, vehicle) => sum + vehicle.fuelConsumed,
      0,
    );

    const statusCounts = {
      active: 0,
      inactive: 0,
      maintenance: 0,
    };

    vehicles.forEach((vehicle) => {
      statusCounts[vehicle.status]++;
    });

    const fleetHealth = Math.max(0, Math.min(100, 100 - totalFuel * 0.1));

    res.json({
      activeVehicles,
      totalDistance,
      totalFuel,
      fleetHealth,
      statusCounts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getInsights = async (req, res) => {
  const vehicles = await Vehicle.find({
    owner: req.user._id,
  });

  const totalFuel = vehicles.reduce((sum, v) => sum + v.fuelConsumed, 0);

  let message = "Fleet operating normally";

  if (totalFuel > 100) {
    message = "High fuel usage detected";
  }

  if (vehicles.length > 5) {
    message = "Fleet utilization is healthy";
  }

  res.json({
    message,
  });
};

module.exports = {
  getDashboardStats,
  getInsights,
};
