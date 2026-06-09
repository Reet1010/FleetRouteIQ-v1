const Vehicle = require("../models/Vehicle");

const routePoints = [
  {
    lat: 28.6139,
    lng: 77.209,
  },

  {
    lat: 28.7041,
    lng: 77.1025,
  },

  {
    lat: 28.4595,
    lng: 77.0266,
  },

  {
    lat: 27.1767,
    lng: 78.0081,
  },

  {
    lat: 26.9124,
    lng: 75.7873,
  },
];

const startVehicleTracking = (io) => {
  setInterval(async () => {
    try {
      // const vehicles = await Vehicle.find({ status: "active" });
      const vehicles = await Vehicle.find();

      for (const vehicle of vehicles) {
        if (vehicle.status === "inactive") {
          io.emit("vehicle-location-updated", {
            vehicleId: vehicle.vehicleId,

            location: vehicle.currentLocation,

            status: vehicle.status,
          });

          continue;
        }
        const nextIndex = (vehicle.routeIndex + 1) % routePoints.length;

        vehicle.currentLocation = routePoints[nextIndex];

        vehicle.routeIndex = nextIndex;

        vehicle.distanceTravelled += Math.random() * 5;

        vehicle.fuelConsumed += Math.random() * 2;

        vehicle.averageSpeed = 40 + Math.random() * 30;

        await vehicle.save();

        io.emit("vehicle-location-updated", {
          vehicleId: vehicle.vehicleId,

          location: vehicle.currentLocation,
          status: vehicle.status,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }, 3000);
};

module.exports = startVehicleTracking;
