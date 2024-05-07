// import React, { useEffect, useState } from "react";
import SideBar from "../ComponentForStudents/SideBar";
import NavBar from "../ComponentForStudents/NavBar";
import "../styles/MainPage.css";
import Poster from "../ComponentForStudents/Poster";
import Dashboard from "../ComponentForStudents/DashBoard";
import RegisterForCourse from "../ComponentForStudents/RegisterForCourse";
import RegisterForTraining from "../ComponentForStudents/RegisterForTraining";
import RegisteredTraining from "../ComponentForStudents/RegisteredTraining";
import { useRecoilState } from "recoil";
import { $Dashboard_Components } from "../Atoms";
import Department from "../ComponentForStudents/Department";
import Attendece from "../ComponentForStudents/Attendece";
// import axios from "axios";

function MainPageForStudents() {
  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard_Components
  );
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
            {selectedComponent === "DashBoard" && <Dashboard />}
            {selectedComponent === "RegisterForCourse" && <RegisterForCourse />}
            {selectedComponent === "RegisterForTraining" && (
              <RegisterForTraining />
            )}
            {selectedComponent === "RegisteredTraining" && (
              <RegisteredTraining />
            )}
            {selectedComponent === "Department" && <Department />}
            {selectedComponent === "Attendece" && <Attendece />}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPageForStudents;
