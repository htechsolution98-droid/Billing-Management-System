import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Auth/Login.jsx";
import Register from "../components/Auth/Register.jsx";
import SuperAdminDashboard from "../pages/SADashboard.jsx";
import DistributorDashboard from "../pages/DistDashboard.jsx";
import DistNuserPage from "../components/Distributor/DistNuserPage.jsx";
import NuserDashboard from "../pages/UserDashboard.jsx";
import ProtectedRoute from "../components/Auth/Protectedroutes.jsx";
import DistributorTable from "../components/SuperAdmin/distributor-table.jsx";
import Distributorform from "../components/SuperAdmin/Distributorform.jsx";
import NuserTable from "../components/SuperAdmin/NuserTable.jsx";
import NuserForm from "../components/SuperAdmin/NuserForm.jsx";
import CustomerTable from "../components/SuperAdmin/CustomerTabel.jsx";
import NuserCustomerPage from "../components/Nuser/NuserCustomerPage.jsx";
import NuserProductPage from "../components/Nuser/NuserProductPage.jsx";
import MasterPage from "../components/Nuser/MasterPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Login" replace />} />

      {/* Login & Register */}

      <Route path="/Register" element={<Register />} />

      <Route path="/Login" element={<Login />} />

      {/* SuperAdmin Dashboard */}

      <Route
        path="/superadmin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Distributor Dashboard */}

      <Route
        path="/distributor-dashboard"
        element={
          <ProtectedRoute allowedRoles={[ "distributor"]}>
            <DistributorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Distributor Nuser Page */}

      <Route
        path="/distributor-nusers"
        element={
          <ProtectedRoute allowedRoles={["distributor"]}>
            <DistNuserPage />
          </ProtectedRoute>
        }
      />

      {/* Nuser Dashboard */}

      <Route
        path="/nuser-dashboard"
        element={
          <ProtectedRoute allowedRoles={["nuser"]}>
            <NuserDashboard />
          </ProtectedRoute>
        }
      />

      {/* distributor datatable  */}
      <Route
        path="/distributor-table"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <DistributorTable />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-distributor"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <Distributorform />
          </ProtectedRoute>
        }
      />

      <Route
        path="/nuser-table"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <NuserTable />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-nuser"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <NuserForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer-table"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <CustomerTable />
          </ProtectedRoute>
        }
      />

      {/* Nuser Customer Management */}
      <Route
        path="/nuser/customers"
        element={
          <ProtectedRoute allowedRoles={["nuser"]}>
            <NuserCustomerPage />
          </ProtectedRoute>
        }
      />

      {/* Nuser Product Management */}
      <Route
        path="/nuser/products"
        element={
          <ProtectedRoute allowedRoles={["nuser"]}>
            <NuserProductPage />
          </ProtectedRoute>
        }
      />

      {/* Nuser Master Management (Brand & Category) */}
      <Route
        path="/nuser/master"
        element={
          <ProtectedRoute allowedRoles={["nuser"]}>
            <MasterPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/Login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
