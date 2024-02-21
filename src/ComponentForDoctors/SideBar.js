import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $Dashboard2_Components } from "../Atoms";
import "../styles/SideBar.css";
function SideBar() {
  const navigate = useNavigate();
  function logout() {
    navigate("/");
    localStorage.clear();
  }
  const [selectedComponent2, setSelectedComponent2] = useRecoilState(
    $Dashboard2_Components
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
            onClick={() => setSelectedComponent2("DashBoard")}
            style={{ textDecoration: "none" }}
            className="NavLink"
          >
            DashBoard
          </NavLink>
        </div>

        <div className="item col-12">
          <i class="fa-solid fa-book-open"></i>
          <NavLink
            onClick={() => setSelectedComponent2("courses")}
            style={{ textDecoration: "none" }}
            className="NavLink"
          >
            Courses
          </NavLink>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-book-open"></i>
          <NavLink
            onClick={() => setSelectedComponent2("StudentRegCourse")}
            style={{ textDecoration: "none" }}
            className="NavLink"
          >
            StudentRegCourse
          </NavLink>
        </div>

        <div className="item col-12">
          <i class="fa-solid fa-book-open"></i>
          <NavLink
            onClick={() => setSelectedComponent2("Training")}
            style={{ textDecoration: "none" }}
            className="NavLink"
          >
            Training
          </NavLink>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-book-open"></i>
          <NavLink
            onClick={() => setSelectedComponent2("StudentRegTraining")}
            style={{ textDecoration: "none" }}
            className="NavLink"
          >
            StudentRegTraining
          </NavLink>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-registered"></i>
          <NavLink
            onClick={() => setSelectedComponent2("Schedule")}
            style={{ textDecoration: "none" }}
            className="NavLink"
          >
            Schedule
          </NavLink>
        </div>

        <div className="login col-12">
          <i class="fa-solid fa-right-from-bracket"></i>
          <p onClick={logout}>Logout</p>
        </div>
      </div>
    </>
  );
}
export default SideBar;
