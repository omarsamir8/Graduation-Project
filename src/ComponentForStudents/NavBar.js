import "../styles/NavBar.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
function NavBar() {
  const [studentinfo, setStudentInfo] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://university-mohamed.vercel.app/Api/user/getuser",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setStudentInfo(response.data.result);
        console.log(studentinfo);
        // Log the updated state
      } catch (error) {
        console.error("Error fetching student info:", error);
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
          <img src={studentinfo.url} alt=""></img>
          <div className="details">
            <h3>{studentinfo.Full_Name}</h3>
            <p> Level : {studentinfo.level}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default NavBar;
