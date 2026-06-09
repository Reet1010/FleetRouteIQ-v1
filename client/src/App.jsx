import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "../src/routes/ProtectedRoute"
import Vehicles from "./pages/Vehicles";
import Tracking from "./pages/Tracking";
import RouteAnalysis from "./pages/RouteAnalysis";
import RouteComparison from "./pages/RouteComparison";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="/vehicles" element={<ProtectedRoute><Vehicles /></ProtectedRoute>} />

        <Route path="/tracking" element={<ProtectedRoute><Tracking /> </ProtectedRoute>} />

        <Route path="/analysis" element={<ProtectedRoute><RouteAnalysis /></ProtectedRoute>} />

        <Route path="/compare-routes" element={<ProtectedRoute><RouteComparison /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;