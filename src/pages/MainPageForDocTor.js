import React from "react";
import SideBar from "../ComponentForDoctors/SideBar";
import NavBar from "../ComponentForDoctors/NavBar";
import "../styles/MainPage.css";
import Poster from "../ComponentForDoctors/Poster";
import Dashboard from "../ComponentForDoctors/DashBoard";
import { useRecoilState } from "recoil";
import { $Dashboard2_Components } from "../Atoms";
import Courses from "../ComponentForDoctors/Courses";
// import StudentRegCourse from "../ComponentForDoctors/StudentRegCourse";
import Training from "../ComponentForDoctors/Training";
// import StudentRegTraining from "../ComponentForDoctors/StudentRegTraining";
import Schedule from "../ComponentForDoctors/Schedule";

function MainPageForDoctor() {
  const [selectedComponent2, setSelectedComponent2] = useRecoilState(
    $Dashboard2_Components
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
            <Poster name="Mohamed" />
          </div>
          <div>
            {selectedComponent2 === "DashBoard" && <Dashboard />}
            {selectedComponent2 === "courses" && <Courses />}
            {/* {selectedComponent2 === "StudentRegCourse" && <StudentRegCourse />} */}
            {selectedComponent2 === "Training" && <Training />}
            {/* {selectedComponent2 === "StudentRegTraining" && (
              <StudentRegTraining />
            )} */}
            {selectedComponent2 === "Schedule" && <Schedule />}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPageForDoctor;
