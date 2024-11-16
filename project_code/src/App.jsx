import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminDashboard from "./components/AdminDashboard";
import SeniorDevDashboard from "./components/SeniorDevDashboard";
import JuniorDevDashboard from "./components/JuniorDevDashboard";
import ProjectUpload from "./components/ProjectUpload";
import Reports from "./components/Reports";
import Unauthorized from "./components/Unauthorized";
import Projects from "./components/Projects";

const RequireAuth = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userRole = decodedToken.role;

    if (allowedRoles.includes(userRole)) {
      return <Outlet />;
    } else {
      return <Navigate to="/unauthorized" replace />;
    }
  } catch (error) {
    console.error("Token parsing error:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

function App() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Token parsing error:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const getDefaultDashboard = () => {
    switch (role) {
      case "Admin":
        return "/admin";
      case "Senior Developer":
        return "/senior-dashboard";
      case "Junior Developer":
        return "/junior-dashboard";
      default:
        return "/unauthorized";
    }
  };

  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth allowedRoles={["Admin", "Senior Developer", "Junior Developer"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/senior" element={<SeniorDevDashboard />} />
            <Route path="/junior" element={<JuniorDevDashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/upload" element={<ProjectUpload />} />
            <Route path="/reports" element={<Reports />} />
            {/* Role-Based Default Route */}
            <Route path="/" element={<Navigate to={getDefaultDashboard()} replace />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
