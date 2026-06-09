const predictFuelCost = (distance, mileage, fuelPrice) => {
  return (distance / mileage) * fuelPrice;
};

const predictDelay = (distance, trafficFactor) => {
  return distance * trafficFactor * 0.1;
};

const calculateRouteScore = ({ distance, fuelCost, delay }) => {
  return distance * 0.2 + fuelCost * 0.5 + delay * 0.3;
};

const getRecommendation = (score) => {
  if (score < 500) return "Optimal";

  if (score < 1000) return "Good";

  return "Avoid";
};

module.exports = {
  predictFuelCost,
  predictDelay,
  calculateRouteScore,
  getRecommendation,
};
