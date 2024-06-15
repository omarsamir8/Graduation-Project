import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $Dashboard2_Components } from "../Atoms";
import "../styles/SideBar.css";
import { useState } from "react";
import axios from "axios";

function SideBar() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [Color, setColor] = useState("");
  const [SelectedComponent, SetSelectedComponent] = useState(null);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const usenavigate = useNavigate();
  const NavigateToScan = () => {
    usenavigate("/Scan");
  };

  const handleClick = (componentName) => {
    setSelectedComponent2(componentName);
    window.scrollTo(0, 750);
  };

  const [selectedComponent2, setSelectedComponent2] = useRecoilState(
    $Dashboard2_Components
  );

  const DoctorLogout = async () => {
    try {
      // if (searchvalue.trim() !== "") {
      const response = await axios.get(
        `https://university-mohamed.vercel.app/Api/instructors/logout`,
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
          <img src="./assets/images/art.jpeg" alt="" />
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-gauge" />
          <li
            onClick={() => handleClick("DashBoard")}
            style={{
              textDecoration: "none",
              color: selectedComponent2 === "DashBoard" ? "black" : "inherit",
              transform:
                selectedComponent2 === "DashBoard" ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            Dashboard
          </li>
        </div>

        <div className="item col-12">
          <i class="fa-solid fa-book-open" />
          <li
            onClick={() => handleClick("courses")}
            style={{
              textDecoration: "none",
              color: selectedComponent2 === "courses" ? "black" : "inherit",
              transform:
                selectedComponent2 === "courses" ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            Courses
          </li>
        </div>

        <div className="item col-12">
          <i class="fa-solid fa-book-open" />
          <li
            onClick={() => handleClick("Training")}
            style={{
              textDecoration: "none",
              color: selectedComponent2 === "Training" ? "black" : "inherit",
              transform:
                selectedComponent2 === "Training" ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            Training
          </li>
        </div>

        <div className="item col-12">
          <i class="fa-solid fa-book-open" />
          <li
            onClick={NavigateToScan}
            style={{
              textDecoration: "none",
              color: selectedComponent2 === "Training" ? "black" : "inherit",
              transform:
                selectedComponent2 === "Training" ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            className="Side_li"
          >
            Scanner
          </li>
        </div>

        {/* <div className="item col-12">
          <i class="fa-solid fa-registered"></i>
          <NavLink
            onClick={() => setSelectedComponent2("StudentsResult")}
            style={{ textDecoration: "none" }}
            className="NavLink"
          >
            Student Result
          </NavLink>
        </div> */}

        <div
          style={{ marginLeft: "15px", marginBottom: "10px" }}
          className="login col-12"
        >
          <i class="fa-solid fa-right-from-bracket" />
          <p onClick={DoctorLogout}>Logout</p>
        </div>
      </div>
    </>
  );
}
export default SideBar;
