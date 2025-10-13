import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const loggedUser = JSON.parse(localStorage.getItem("userData"));
  if (!loggedUser) {
    <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
