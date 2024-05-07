import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $Dashboard2_Components } from "../Atoms";
import "../styles/SideBar.css";
import { useState } from "react";

function SideBar() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard2_Components
  );

  const handleItemClick = (componentName) => {
    setSelectedComponent(componentName);
    window.scrollTo(0, 750);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };

  const sidebarItems = [
    { name: "Dashboard", icon: "fa-gauge" },
    { name: "Courses", icon: "fa-book-open" },
    { name: "Training", icon: "fa-book-open" },
    { name: "Scanner", icon: "fa-book-open", navigateTo: "/Scan" },
    // Add more sidebar items as needed
  ];

  return (
    <div className="sidebar-container">
      <div className="icon-container">
        <img src="./assets/images/art.jpeg" alt="" />
      </div>
      {sidebarItems.map((item, index) => (
        <div className="item col-12" key={index}>
          <i className={`fa-solid ${item.icon}`} />
          <li
            onClick={() => handleItemClick(item.name)}
            style={{
              textDecoration: "none",
              color: selectedComponent === item.name ? "black" : "inherit",
              transform:
                selectedComponent === item.name ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            {item.name}
          </li>
        </div>
      ))}
      <div
        className="login col-12"
        style={{ marginLeft: "15px", marginBottom: "10px" }}
      >
        <i className="fa-solid fa-right-from-bracket" />
        <p onClick={handleLogout}>Logout</p>
      </div>
    </div>
  );
}

export default SideBar;
