import "../styles/NavBar.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { routes } from "../routes";
function NavBar() {
  const [doctorinfo, setDoctorInfo] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.instructor._id}${routes.instructor.InstructorInfo}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setDoctorInfo(response.data.user);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  return (
    <>
      <div className="nav-bar">
        <div className="search">
          <input type="text" placeholder="Search"></input>
        </div>
        <div className="info">
          <img src="./assets/images/1.png" alt="" />
          <div className="details">
            <h3>{doctorinfo.FullName}</h3>
            <p>{doctorinfo.department}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
