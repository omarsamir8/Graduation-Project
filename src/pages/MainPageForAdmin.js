import React from "react";
import SideBar from "../ComponentForAdmin/SideBar";
import NavBar from "../ComponentForAdmin/NavBar";
import Poster from "../ComponentForAdmin/Poster";
import CreateCourse from "../ComponentForAdmin/CreateCourse";
// import CreateDoctor from "../ComponentForAdmin/CreateDoctor";
// import AllStudent from "../ComponentForAdmin/All_Student";
// import AllDoctor from "../ComponentForAdmin/All_Doctor";
// import Dashboard from "../ComponentForAdmin/DashBoard";
// import CreateStudent from "../ComponentForAdmin/CreateStudent";
// import CreateTraining from "../ComponentForAdmin/CreateTraining";
import "../styles/MainPage.css";

function MainPageForAdmin() {
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
            <Poster name="Admin" />
          </div>
          <div>
            {/* <Dashboard /> */}
            {/* <CreateStudent /> */}
            {/* <CreateDoctor /> */}
            {/* <AllStudent /> */}
            {/* <AllDoctor /> */}
            {/* <CreateCourse /> */}
            {/* <CreateTraining /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPageForAdmin;
