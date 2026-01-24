import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log('p')

  if (!userData) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
