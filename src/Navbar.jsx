import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import settings from "./images/settings.png";
import bell from "./images/bell.png";
import profilepic from "./images/profilepic.png";
import Logo from "./Logo";
import Dashboard from "./images/dashboard.png";
import Roles from "./images/roll.png";
import Employees from "./images/employees.png";
import Payroll from "./images/payrole.png";
import Reports from "./images/report.png";
import SeachIcon from "./images/Frame.png";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);

  const toggleEmployeesMenu = () => {
    setIsEmployeesOpen(!isEmployeesOpen);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <button className="hamburger" onClick={toggleMenu}>
        &#9776;
      </button>
      <Logo />

      <div ref={sidebarRef} className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <ul className="sidebar-list">
          <Logo />
          {[
            { name: "Dashboard", icon: Dashboard },
            { name: "Roles", icon: Roles },
            { name: "Employees", icon: Employees, hasSubmenu: true },
            { name: "Payroll", icon: Payroll },
            { name: "Reports", icon: Reports },
            { name: "Settings", icon: settings },
          ].map((item, index) => (
            <li className="sidebar-item" key={index}>
              <Link
                // to={`/${item.name.toLowerCase()}`}
                onClick={item.name === "Employees" ? toggleEmployeesMenu : null}
              >
                <img
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className="sidebar-icon"
                  style={{
                    filter: "invert(10%) grayscale(100%) brightness(0)",
                  }}
                />
                {item.name}
                {item.name === "Employees" && (
                  <span
                    className={`dropdown-arrow ${
                      isEmployeesOpen ? "rotate" : ""
                    }`}
                  >
                    &#9660;
                  </span>
                )}
              </Link>
              {item.name === "Employees" && isEmployeesOpen && (
                <ul className="submenu">
                  <li>
                    <Link>All Employees</Link>
                  </li>
                  <li>
                    <Link>Teams</Link>
                  </li>
                  <li>
                    <Link>Roles</Link>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <ul className="nav-list">
        {["Home", "Library", "Chats", "Help"].map((item, index) => (
          <li className="nav-item" key={index}>
            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
          </li>
        ))}
        <div className="navleft">
          <li className="nav-item">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                icon={SeachIcon}
                type="text"
                placeholder="Search anything here"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
            </form>
          </li>
          <div className="imagenav">
            <img
              src={settings}
              alt="Logo"
              className="img"
              style={{ filter: "invert(10%) grayscale(100%) brightness(0)" }}
            />
            <img
              src={bell}
              alt="Logo"
              className="img"
              style={{ filter: "invert(10%) grayscale(100%) brightness(0)" }}
            />
            <img src={profilepic} alt="Logo" className="imgprofile" />
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
