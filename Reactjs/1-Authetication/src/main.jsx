import { createRoot } from "react-dom/client";
import "./index.css";
import Signup from "./components/Signup.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./components/Dashboard.jsx";
import Signin from "./components/Signin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>,
);
