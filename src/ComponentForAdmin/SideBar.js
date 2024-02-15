import { NavLink, useNavigate } from "react-router-dom";
import "../styles/SideBar.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { $Dashboard_Components } from "../Atoms";
function SideBar() {
  const navigate = useNavigate();
  function logout() {
    navigate("/");
    localStorage.clear();
  }
  const [selectedComponent, setSelectedComponent] = useRecoilState($Dashboard_Components);

  return (
    <>
      <div className="sidebar-container">
        <div className="icon-container">
          {/* <i class="fa-solid fa-graduation-cap"></i> */}
          <img src="./assets/images/art.jpeg" alt=""></img>
        </div>
        <div className="item col-12">
          <i class=" sideIcon fa-solid fa-gauge"></i>
          <NavLink onClick={()=>setSelectedComponent("DashBoard")} style={{textDecoration:"none"}} className="NavLink" >Dashboard</NavLink>
        </div>
        <div className="item col-12">
          <i class=" sideIcon fa-solid fa-registered"></i>
          <NavLink onClick={()=>setSelectedComponent("CreateStudent")}  style={{textDecoration:"none"}} className="NavLink"  >
            {" "}
            Add Student
          </NavLink>
        </div>
        <div className="item col-12">
          <i class=" sideIcon fa-solid fa-registered"></i>
          <NavLink onClick={()=>setSelectedComponent("All_Students")}  style={{textDecoration:"none"}} className="NavLink" > All Students</NavLink>
        </div>
        <div className="item col-12">
          <i class="sideIcon fa-solid fa-registered"></i>
          <NavLink onClick={()=>setSelectedComponent("CreateDoctor")}  style={{textDecoration:"none"}} className="NavLink" > Add Doctor</NavLink>
        </div>
        <div className="item col-12">
          <i class="sideIcon fa-solid fa-registered"></i>
          <NavLink onClick={()=>setSelectedComponent("AllDoctors")}  style={{textDecoration:"none"}} className="NavLink" > All Doctors</NavLink>
        </div>
        <div className="item col-12">
          <i class="sideIcon fa-solid fa-book-open"></i>
          <NavLink onClick={()=>setSelectedComponent("CreateCourse")}  style={{textDecoration:"none"}} className="NavLink" >Add Course</NavLink>
        </div>
        <div className="item col-12">
          <i class="sideIcon fa-brands fa-stack-overflow"></i>
          <NavLink onClick={()=>setSelectedComponent("CreateTraining")}  style={{textDecoration:"none"}} className="NavLink" >Add Training</NavLink>
        </div>
        <div className="item col-12">
          <i class="sideIcon fa-brands fa-stack-overflow"></i>
          <NavLink  style={{textDecoration:"none"}} className="NavLink"  >Add Scheduale</NavLink>
        </div>

        <div className="item col-12">
          <i class="sideIcon fa-solid fa-message"></i>
          <NavLink  style={{textDecoration:"none"}} className="NavLink">Chat</NavLink>
        </div>
        <div className="login col-12">
          <i class="sideIcon fa-solid fa-right-from-bracket"></i>
          <p onClick={logout} className="logout_Button">
            Logout
          </p>
        </div>
      </div>
    </>
  );
}
export default SideBar;
