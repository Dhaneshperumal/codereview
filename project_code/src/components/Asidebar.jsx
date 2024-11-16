import React, { useEffect, useState } from "react";
import { MdDashboard, MdGroups } from "react-icons/md";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { FaHandsHelping } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { Link } from "react-router-dom";

const AsideBar = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debugging: Check token availability
  
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        console.log("Decoded Token:", decodedToken); // Debugging: Inspect token structure
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Token parsing error:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const getDashboardPath = () => {
    switch (userRole) {
      case "Admin":
        return "/admin";
      case "Senior Developer":
        return "/senior";
      case "Junior Developer":
        return "/junior";
      default:
        return "/dashboard"; 
    }
  };

  return (
    <aside className="d-none d-lg-block d-flex flex-column justify-content-center col-lg-3 aside p-3 position-relative">
      <h1 className="display-6 text-center fw-bold">Code Review</h1>
      <ul className="list-group bg-transparent">
        {/* Dashboard Link */}
        <li className="list-group-item border-0 border-bottom p-2 ps-3">
          <MdDashboard />
          <Link to={getDashboardPath()}> Dashboard</Link>
        </li>

        {/* Projects Link */}
        <li className="list-group-item border-0 border-bottom p-2 ps-3">
          <MdGroups />
          <Link to={"/projects"}> Projects</Link>
        </li>

        {/* Conditional Upload File Link for Junior Developers */}
        {userRole === "Junior Developer" && (
          <li className="list-group-item border-0 border-bottom p-2 ps-3">
            <MdGroups />
            <Link to={"/upload"}> Upload File</Link>
          </li>
        )}

        {/* Reports and Issues Links */}
        <li className="list-group-item border-0 border-bottom p-2 ps-3">
          <MdGroups />
          <Link to={"/reports"}> Reports</Link>
        </li>
        <li className="list-group-item border-0 border-bottom p-2 ps-3">
          <AiOutlineIssuesClose />
          <Link to={"/issues"}> Issues</Link>
        </li>
      </ul>

      {/* Bottom Navigation Links */}
      <ul className="list-group position-absolute bottom-0" style={{ width: "92%" }}>
        <li className="list-group-item border-0 border-bottom p-2 ps-3">
          <FaHandsHelping /> Help
        </li>
        <li className="list-group-item border-0 border-bottom p-2 ps-3">
          <IoMdContact /> Contact
        </li>
        <li className="list-group-item border-0 border-bottom p-2 ps-3">
          <FcAbout /> About Us
        </li>
      </ul>
    </aside>
  );
};

export default AsideBar;
