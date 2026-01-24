import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log('u')


  if (!userData&&userData!=='') {
    return <Navigate to="/" replace />;
  }

  if (userData.role !== "client") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default UserRoute;
