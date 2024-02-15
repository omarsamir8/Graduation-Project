// import React, { useEffect, useState } from "react";
import SideBar from "../ComponentForStudents/SideBar";
import NavBar from "../ComponentForStudents/NavBar";
import "../styles/MainPage.css";
import Poster from "../ComponentForStudents/Poster";
import Dashboard from "../ComponentForStudents/DashBoard";
// import axios from "axios";

function MainPageForStudents() {
  return (
    <>
      <div className="mainpage">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="container-page">
          <div className="navbar">
            <NavBar />
          </div>
          <div className="poster">
            {/* Use the studentinfo state to pass data to Poster component */}
            <Poster />
          </div>
          <div>
            <Dashboard />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPageForStudents;
