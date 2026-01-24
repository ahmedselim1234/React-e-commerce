import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log('a')


  if (!userData) {
    return <Navigate to="/" replace />;
  }

  if (userData.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
