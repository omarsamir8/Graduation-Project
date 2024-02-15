import "../styles/Poster.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
function Poster() {
  const [studentinfo, setStudentInfo] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://university-system-rosy.vercel.app/Api/user/getuser",
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
      <div className="poster">
        <div>
          <p className="p1">September ,2024</p>
          <h2>Welcom Back,{studentinfo.Full_Name}!</h2>
          <p className="p2">Alwayes Stay Updated In Your Student Portal</p>
        </div>

        <img
          src="./assets/images/student.png"
          className="studentt"
          alt=""
        ></img>
      </div>
    </>
  );
}
export default Poster;
