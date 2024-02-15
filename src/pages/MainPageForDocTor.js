import React from "react";
import SideBar from "../ComponentForDoctors/SideBar";
import NavBar from "../ComponentForDoctors/NavBar";
import "../styles/MainPage.css";
import Poster from "../ComponentForDoctors/Poster";
import Dashboard from "../ComponentForDoctors/DashBoard";

function MainPageForDoctor() {
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
            <Poster name="Mohamed" />
          </div>
          <div>
            <Dashboard />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPageForDoctor;
