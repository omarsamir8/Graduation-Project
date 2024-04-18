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
            onClick={() => setSelectedComponent("addAdmin")}
          >
            Add Admin
          </NavLink>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-gauge"></i>
          <NavLink
            className="NavLink"
            onClick={() => setSelectedComponent("getalladmin")}
          >
            ALL Admins
          </NavLink>
        </div>

        <div className="item col-12">
          <i class="fa-solid fa-book-open"></i>
          <NavLink
            className="NavLink"
            onClick={() => setSelectedComponent("setting")}
          >
            Setting
          </NavLink>
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
