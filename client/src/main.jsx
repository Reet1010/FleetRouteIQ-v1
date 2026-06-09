import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/global.css";
import "./styles/theme.css";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);