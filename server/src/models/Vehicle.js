const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true,
    },

    driverName: {
      type: String,
      required: true,
    },

    fuelEfficiency: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "maintenance"],
      default: "active",
    },

    currentLocation: {
      lat: {
        type: Number,
        default: 28.6139,
      },

      lng: {
        type: Number,
        default: 77.209,
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    distanceTravelled: {
      type: Number,
      default: 0,
    },

    averageSpeed: {
      type: Number,
      default: 40,
    },

    fuelConsumed: {
      type: Number,
      default: 0,
    },
    routeIndex: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
