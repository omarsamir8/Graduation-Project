import { NavLink, useNavigate } from "react-router-dom";
import "../styles/SideBar.css";
import { useRecoilState } from "recoil";
import { $Dashboard_Components } from "../Atoms";
import Semester_grade from "../pages/Semester_grade";
import { useState } from "react";
function SideBar() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [Color, setColor] = useState("");
  const [SelectedComponent, SetSelectedComponent] = useState(null);
  const handleClick = (componentName) => {
    setSelectedComponent(componentName);
    window.scrollTo(0, 750);
  };

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
          <img src="./assets/images/art.jpeg" alt="" />
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-gauge" />
          <li
            onClick={() => handleClick("addAdmin")}
            style={{
              textDecoration: "none",
              color: selectedComponent === "addAdmin" ? "black" : "inherit",
              transform:
                selectedComponent === "addAdmin" ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            Add Admin
          </li>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-gauge" />
          <li
            onClick={() => handleClick("getalladmin")}
            style={{
              textDecoration: "none",
              color: selectedComponent === "getalladmin" ? "black" : "inherit",
              transform:
                selectedComponent === "getalladmin" ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            All Admins
          </li>
        </div>

        <div className="item col-12">
          <i class="fa-solid fa-book-open" />
          <li
            onClick={() => handleClick("setting")}
            style={{
              textDecoration: "none",
              color: selectedComponent === "setting" ? "black" : "inherit",
              transform:
                selectedComponent === "setting" ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            Settings
          </li>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-book-open" />
          <li
            onClick={() => handleClick("studentgrade")}
            style={{
              textDecoration: "none",
              color: selectedComponent === "studentgrade" ? "black" : "inherit",
              transform:
                selectedComponent === "studentgrade"
                  ? "scale(1.1)"
                  : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            Student Grade
          </li>
        </div>
        <div className="login col-12">
          <i class="fa-solid fa-right-from-bracket" />
          <p onClick={logout} className="logout_Button">
            Logout
          </p>
        </div>
      </div>
    </>
  );
}
export default SideBar;
