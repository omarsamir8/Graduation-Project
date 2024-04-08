import { NavLink, useNavigate } from "react-router-dom";
import "../styles/SideBar.css";
import { useRecoilState } from "recoil";
import { $Dashboard_Components } from "../Atoms";
import Semester_grade from "../pages/Semester_grade";
function SideBar() {
  const navigate = useNavigate();

  function logout() {
    navigate("/");
    localStorage.clear();
  }

  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard_Components
  );
  return (
    <>
      <div className="sidebar-container">
        <div className="icon-container">
          {/* <i class="fa-solid fa-graduation-cap"></i> */}
          <img src="./assets/images/art.jpeg" alt=""></img>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-gauge"></i>
          <NavLink
            className="NavLink"
            onClick={() => setSelectedComponent("DashBoard")}
          >
            Dashboard
          </NavLink>
        </div>

        <div className="item col-12">
          <i class="fa-solid fa-book-open"></i>
          <NavLink
            className="NavLink"
            onClick={() => setSelectedComponent("RegisterForCourse")}
          >
            Register For Course
          </NavLink>
        </div>
        <div className="item col-12">
          <i class="fa-brands fa-stack-overflow"></i>
          <NavLink to="/Registered_Courses" className="NavLink">
            Registered Courses
          </NavLink>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-layer-group"></i>
          <NavLink
            className="NavLink"
            onClick={() => setSelectedComponent("RegisterForTraining")}
          >
            Register For Training
          </NavLink>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-layer-group"></i>
          <NavLink
            className="NavLink"
            onClick={() => setSelectedComponent("RegisteredTraining")}
          >
            Registered Training
          </NavLink>
        </div>
        <div className="item col-12">
          <i class="fa-brands fa-stack-overflow"></i>
          <NavLink to="/Semester_grade" className="NavLink">
            Semester Grades
          </NavLink>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-square-plus"></i>
          <NavLink to="/Reports_student" className="NavLink">
            Newspaper
          </NavLink>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-address-card"></i>
          <NavLink
            className="NavLink"
            onClick={() => setSelectedComponent("Department")}
          >
            Department
          </NavLink>
        </div>

        <div className="item col-12">
          <i class="fa-solid fa-message"></i>
          <NavLink className="NavLink">Chat</NavLink>
        </div>
        <div className="login col-12">
          <i class="fa-solid fa-right-from-bracket"></i>
          <p onClick={logout} className="logout_Button">
            Logout
          </p>
        </div>
      </div>
    </>
  );
}
export default SideBar;
