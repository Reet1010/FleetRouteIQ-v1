require("dotenv").config();

const mongoose = require("mongoose");

const Vehicle = require("../src/models/Vehicle");
const User = require("../src/models/User");

const connectDB = require("../src/config/db");

const seed = async () => {
  await connectDB();

  const vehicles = [];
  const user = await User.findOne({ email: "alex@gmail.com" });

  for (let i = 1; i <= 20; i++) {
    vehicles.push({
      vehicleId: `TR${i}`,

      driverName: `Driver ${i}`,

      fuelEfficiency: 10 + Math.random() * 10,

      distanceTravelled: Math.random() * 2000,

      fuelConsumed: Math.random() * 100,

      status: ["active", "inactive", "maintenance"][
        Math.floor(Math.random() * 3)
      ],

      currentLocation: {
        lat: 28.6 + Math.random(),

        lng: 77.2 + Math.random(),
      },
      owner: user._id,
    });
  }

  await Vehicle.insertMany(vehicles);

  console.log("Vehicles seeded");

  process.exit();
};

seed();
