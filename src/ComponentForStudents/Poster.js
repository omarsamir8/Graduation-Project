import "../styles/Poster.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { routes } from "../routes";
function Poster() {
  const [studentinfo, setStudentInfo] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.student._id}${routes.student.getInfo}`,
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
          <h2>Welcome Back,{studentinfo.Full_Name}!</h2>
          <p className="p2">Alwayes stay updated in your student portal</p>
        </div>

        <img src="./assets/images/student.png" className="studentt" alt="" />
      </div>
    </>
  );
}
export default Poster;
