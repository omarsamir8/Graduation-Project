// import React, { useEffect, useState } from "react";
import SideBar from "../ComponentForSuberAdmin/SideBar";
import NavBar from "../ComponentForSuberAdmin/NavBar";
import "../styles/MainPage.css";
import Poster from "../ComponentForSuberAdmin/Poster";
import { useRecoilState } from "recoil";
import { $Dashboard_Components } from "../Atoms";
import CreateAdmin from "../ComponentForSuberAdmin/CreateAdmin";
import AllAdmins from "../ComponentForSuberAdmin/AllAdmins";
import Setting from "../ComponentForSuberAdmin/Setting";
import StudentGrades from "../ComponentForSuberAdmin/Student_Grade";
// import axios from "axios";

function MainPageForSuberAdmin() {
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
            {selectedComponent === "addAdmin" && <CreateAdmin />}
            {selectedComponent === "getalladmin" && <AllAdmins />}
            {selectedComponent === "setting" && <Setting />}
            {selectedComponent === "studentgrade" && <StudentGrades />}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPageForSuberAdmin;
