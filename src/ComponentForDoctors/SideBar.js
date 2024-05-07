import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $Dashboard2_Components } from "../Atoms";
import "../styles/SideBar.css";

function SideBar() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard2_Components
  );
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (componentName) => {
    setSelectedComponent(componentName);
    window.scrollTo(0, 750);
  };

  const logout = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <div className="sidebar-container">
      <div className="icon-container">
        <img src="./assets/images/art.jpeg" alt="" />
      </div>

      <NavItem
        iconName="fa-gauge"
        componentName="Dashboard"
        onClick={handleClick}
        selectedComponent={selectedComponent}
      />
      <NavItem
        iconName="fa-book-open"
        componentName="Courses"
        onClick={handleClick}
        selectedComponent={selectedComponent}
      />
      <NavItem
        iconName="fa-book-open"
        componentName="Training"
        onClick={handleClick}
        selectedComponent={selectedComponent}
      />
      <NavItem
        iconName="fa-book-open"
        componentName="Scanner"
        onClick={() => navigate("/Scan")}
        selectedComponent={selectedComponent}
      />

      <div
        style={{ marginLeft: "15px", marginBottom: "10px" }}
        className="login col-12"
      >
        <i className="fa-solid fa-right-from-bracket" />
        <p onClick={logout}>Logout</p>
      </div>
    </div>
  );
}

// Component for each sidebar item
function NavItem({ iconName, componentName, onClick, selectedComponent }) {
  return (
    <div className="item col-12">
      <i className={`fa-solid ${iconName}`} />
      <NavLink
        to="/"
        onClick={() => onClick(componentName)}
        style={{
          textDecoration: "none",
          color: selectedComponent === componentName ? "black" : "inherit",
          transform:
            selectedComponent === componentName ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.3s ease",
        }}
        className="Side_li"
      >
        {componentName}
      </NavLink>
    </div>
  );
}

export default SideBar;
