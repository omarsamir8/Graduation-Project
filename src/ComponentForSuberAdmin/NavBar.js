import "../styles/NavBar.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { routes } from "../routes";
function NavBar() {
  const [SuperAdminInfo, setSuperAdminInfo] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.Admin._id}${routes.Admin.getinfoSuper}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setSuperAdminInfo(response.data.user);
        console.log(SuperAdminInfo);
        // Log the updated state
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  console.log(SuperAdminInfo);
  return (
    <>
      <div className="nav-bar">
        <div className="search">
          <input type="text" placeholder="Search"></input>
        </div>
        <div className="info">
          <img src={SuperAdminInfo.urlImg} alt=""></img>
          <div className="details">
            <h3>{SuperAdminInfo.FullName}</h3>
            <p> {SuperAdminInfo.role}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default NavBar;
