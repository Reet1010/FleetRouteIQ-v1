const {
  predictFuelCost,
  predictDelay,
  calculateRouteScore,
  getRecommendation,
} = require("../services/aiEngine");

const Vehicle = require("../models/Vehicle");

const analyzeRoute = async (req, res) => {
  const { distance, mileage, fuelPrice, trafficFactor } = req.body;

  const fuelCost = predictFuelCost(distance, mileage, fuelPrice);

  const delay = predictDelay(distance, trafficFactor);

  const score = calculateRouteScore({
    distance,
    fuelCost,
    delay,
  });
  const recommendation = getRecommendation(score);

  res.json({
    fuelCost,
    delay,
    score,
    recommendation,
  });
};
const compareRoutes = async (req, res) => {
  try {
    const { routes, mileage, fuelPrice } = req.body;

    const analyzedRoutes = routes.map((route) => {
      const fuelCost = predictFuelCost(route.distance, mileage, fuelPrice);

      const delay = predictDelay(route.distance, route.trafficFactor);

      const score = calculateRouteScore({
        distance: route.distance,
        fuelCost,
        delay,
      });

      return {
        ...route,
        fuelCost,
        delay,
        score,
      };
    });

    analyzedRoutes.sort((a, b) => a.score - b.score);

    const bestRoute = analyzedRoutes[0];

    res.json({
      bestRoute,
      routes: analyzedRoutes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecommendations = async (req, res) => {
  const vehicles = await Vehicle.find({
    owner: req.user._id,
  });

  const recommendations = [];

  vehicles.forEach((vehicle) => {
    if (vehicle.fuelConsumed > 50) {
      recommendations.push(`Reduce idle time for ${vehicle.vehicleId}`);
    }

    if (vehicle.distanceTravelled > 1000) {
      recommendations.push(`${vehicle.vehicleId} may require maintenance`);
    }
  });

  if (recommendations.length === 0) {
    recommendations.push("Fleet performance looks healthy");
  }

  res.json(recommendations);
};

module.exports = {
  analyzeRoute,
  compareRoutes,
  getRecommendations,
};
