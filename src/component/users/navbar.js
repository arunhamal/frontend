import React from "react";
import { Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../../futsal.png';

import "../../styles/navbar.css";
import { getLocalStorage } from "../../shared/Common";

const Navbar = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  return (
    <nav className="navbar navbar-expand-lg  justify-space-between">
      <div className="container logo-width ms-5">
        <a className="navbar-brand" href="#" onClick={() => navigate("/")}>
          <img style={{width: '100px', height: '50px'}} src={logo} alt="FutsalPro"/>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div
        className="collapse navbar-collapse responsive-nav-item me-5"
        id="navbarNav"
      >
        <ul className="navbar-nav me-5">
        <li
            className="nav-item"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <a className={`nav-link ${pathname === '/' ? 'active' : ''}`} aria-current="page" href="#">
              Home
            </a>
          </li>
          <li
            className="nav-item"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/futsal/list")}
          >
            <a className={`nav-link ${pathname === '/futsal/list' ? 'active' : ''}`} aria-current="page" href="#">
              Booking
            </a>
          </li>
          <li
            className={`nav-item`}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/challenge")}
          >
            <a className={`nav-link ${pathname === '/challenge' ? 'active' : ''}`}>Chalenges</a>
          </li>
          <li
            className={`nav-item`}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/event/list")}
          >
            <a className={`nav-link ${pathname === '/event/list' ? 'active' : ''}`}>Events</a>
          </li>
          <li
            className={`nav-item`}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/contact-us")}
          >
            <a className={`nav-link ${pathname === '/contact-us' ? 'active' : ''}`}>Contact</a>
          </li>
        </ul>
        {getLocalStorage("admin-loggedin") === "false" && (
          <Tooltip title="Profile">
            <UserOutlined
              onClick={() => navigate("/user/profile")}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        )}
        {getLocalStorage("futsalPro-jwt") ? (
          ""
        ) : (
          <button className="view-all-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
