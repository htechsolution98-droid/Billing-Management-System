import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  let user = null;
  try {
    const rawUser = localStorage.getItem("user");
    user = rawUser ? JSON.parse(rawUser) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage", error);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
  const token = localStorage.getItem("token");

  // Not logged in
  if (!user || !token) {
    return <Navigate to="/Login" replace />;
  }

  // Role check
  if (!allowedRoles.includes(user.role)) {
    return;
    <Navigate to="/Login" />;
    // <div className="flex items-center justify-center h-screen">
    //   <h1 className="text-red-600 text-xl font-bold">
    //     Access Denied ❌

    //   </h1>
    // </div>
  }

  return children;
};

export default ProtectedRoute;
