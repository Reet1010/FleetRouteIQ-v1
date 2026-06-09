const Vehicle = require("../models/Vehicle");

const createVehicle = async (req, res) => {
  try {
    const { vehicleId, driverName, fuelEfficiency } = req.body;

    const vehicle = await Vehicle.create({
      vehicleId,
      driverName,
      fuelEfficiency,
      owner: req.user._id,
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      owner: req.user._id,
    });

    res.json(vehicles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createVehicle,
  getVehicles,
};
