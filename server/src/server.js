const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const startVehicleTracking = require("./sockets/vehicleTracker");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");

dotenv.config();

connectDB();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

startVehicleTracking(io);

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ai/compare-routes", aiRoutes);

app.get("/", (req, res) => {
  res.send("FleetRouteIQ API Running");
});

// app.get("/test-dashboard", (req, res) => {
//   res.json({
//     message: "dashboard works",
//   });
// });

const PORT = process.env.PORT || 5000;

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Client Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
