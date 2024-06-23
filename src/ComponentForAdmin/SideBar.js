import { useNavigate } from "react-router-dom";
import "../styles/SideBar.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { $Dashboard_Components } from "../Atoms";
import axios from "axios";
function SideBar() {
  const [className, setclassName] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [Color, setColor] = useState("");
  const [SelectedComponent, SetSelectedComponent] = useState(null);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const handleClick = (componentName) => {
    setSelectedComponent(componentName);
    window.scrollTo(0, 750);
  };
  const navigate = useNavigate();

  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard_Components
  );

  const AdminLogout = async () => {
    try {
      // if (searchvalue.trim() !== "") {
      const response = await axios.get(
        `https://university-mohamed.vercel.app/Api/admins/logout`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      const data = response.data;
      console.log(data);
      if (data.message === "user logout successfully") {
        navigate("/");
        localStorage.clear();
      }
      // Here you can update the state related to the search or perform any other actions with the data
    } catch (error) {
      // }
      console.error("Error fetching search results:", error);
    }
  };
  return (
    <>
      <div className="sidebar-container">
        <div className="icon-container">
          {/* <i class="fa-solid fa-graduation-cap"></i> */}
          <img src="./assets/images/art.jpeg" alt="" />
        </div>
        <div className="item col-12">
          <i class=" sideIcon fa-solid fa-gauge" />

          <li
            onClick={() => handleClick("DashBoard")}
            style={{
              textDecoration: "none",
              color: selectedComponent === "DashBoard" ? "black" : "inherit",
              transform:
                selectedComponent === "DashBoard" ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            Dashboard
          </li>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-person-circle-plus" />
          <li
            onClick={() => handleClick("CreateStudent")}
            style={{
              textDecoration: "none",
              color:
                selectedComponent === "CreateStudent" ? "black" : "inherit",
              transform:
                selectedComponent === "CreateStudent"
                  ? "scale(1.1)"
                  : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            Add Student
          </li>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-people-group" />
          <li
            onClick={() => handleClick("All_Students")}
            style={{
              textDecoration: "none",
              color: selectedComponent === "All_Students" ? "black" : "inherit",
              transform:
                selectedComponent === "All_Students"
                  ? "scale(1.1)"
                  : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            All Students
          </li>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-person-circle-plus" />
          <li
            onClick={() => handleClick("CreateDoctor")}
            style={{
              textDecoration: "none",
              color: selectedComponent === "CreateDoctor" ? "black" : "inherit",
              transform:
                selectedComponent === "CreateDoctor"
                  ? "scale(1.1)"
                  : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            Add Doctor
          </li>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-people-group" />
          <li
            onClick={() => handleClick("AllDoctors")}
            style={{
              textDecoration: "none",
              color: selectedComponent === "AllDoctors" ? "black" : "inherit",
              transform:
                selectedComponent === "AllDoctors" ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            All Doctors
          </li>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-plus" />
          <li
            onClick={() => handleClick("CreateCourse")}
            style={{
              textDecoration: "none",
              color: selectedComponent === "CreateCourse" ? "black" : "inherit",
              transform:
                selectedComponent === "CreateCourse"
                  ? "scale(1.1)"
                  : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            Add Course
          </li>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-plus" />
          <li
            onClick={() => handleClick("CreateTraining")}
            style={{
              textDecoration: "none",
              color:
                selectedComponent === "CreateTraining" ? "black" : "inherit",
              transform:
                selectedComponent === "CreateTraining"
                  ? "scale(1.1)"
                  : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            Add Training
          </li>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-plus" />
          <li
            onClick={() => handleClick("CreateSemester")}
            style={{
              textDecoration: "none",
              color:
                selectedComponent === "CreateSemester" ? "black" : "inherit",
              transform:
                selectedComponent === "CreateSemester"
                  ? "scale(1.1)"
                  : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            Add Semester
          </li>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-gear" />
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
            Setting
          </li>
        </div>

        <div className="item col-12">
          <i class="sideIcon fa-solid fa-message" />
          <li
            style={{ textDecoration: "none" }}
            className="Side_li"
            onClick={() => (window.location.href = "http://localhost:3001")}
          >
            Chat
          </li>
        </div>
        <div className="login col-12">
          <i class="sideIcon fa-solid fa-right-from-bracket" />
          <p onClick={AdminLogout} className="logout_Button">
            Logout
          </p>
        </div>
      </div>
    </>
  );
}
export default SideBar;
