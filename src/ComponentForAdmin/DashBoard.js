import { React, useEffect, useState } from "react";
import "../styles/Dashboard.css";

import { routes } from "../routes";
import AcquisitionsChart from "./Chart/Chart";
function DashBoard() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const [dashboardinfo, setdashboardinfo] = useState([]);
  const handleSidebarClick = (componentName) => {
    setSelectedComponent(componentName);
  };
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // get Dashboard Info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.Admin._id}${routes.Admin.dashboardAdmin}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = await response.json();
        setdashboardinfo(data.info);
        console.log(data.info);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  return (
    <>
      <div className="dashboard-container">
        <div className="coulmns">
          <div className="main-container">
            <div className="main">
              <i class="fa-solid fa-book-open" />
              <h3 className="animate__animated animate__backInDown">
                {dashboardinfo.students}
              </h3>
              <p className="animate__animated animate__backInDown">
                Total Students
              </p>
            </div>
            <div className="main">
              <i class="fa-solid fa-check" />
              <h3 className="animate__animated animate__backInDown">
                {dashboardinfo.instructors}
              </h3>
              <p className="animate__animated animate__backInDown">
                Total Doctor{" "}
              </p>
            </div>
            <div className="main">
              <i class="fa-solid fa-square-xmark" />
              <h3 className="animate__animated animate__backInDown">
                {dashboardinfo.courses}
              </h3>
              <p className="animate__animated animate__backInDown">
                {" "}
                Total Courses{" "}
              </p>
            </div>
          </div>
          <div className="main-container">
            <div className="main">
              <i class="fa-brands fa-stack-overflow" />
              <h3 className="animate__animated animate__backInDown">
                {dashboardinfo.training}
              </h3>
              <p className="animate__animated animate__backInDown">
                Total Training
              </p>
            </div>
            <div className="main">
              <i class="fa-solid fa-check" />
              <h3 className="animate__animated animate__backInDown">
                {dashboardinfo.semsters}
              </h3>
              <p className="animate__animated animate__backInDown">
                Total Semester
              </p>
            </div>
            <div className="main">
              <i class="fa-solid fa-message" />
              <h3 className="animate__animated animate__backInDown">3</h3>
              <p className="animate__animated animate__backInDown">
                unreaded messages
              </p>
            </div>
          </div>
        </div>

        <div className="instructor">
          <div className="title">
            <p className="animate__animated animate__backInRight">
              Some Training{" "}
            </p>
          </div>
          <div className="images">
            <img
              src="./assets/images/flutter.png"
              alt=""
              className="animate__animated animate__backInRight"
            />
            <img
              src="./assets/images/web.avif"
              alt=""
              className="animate__animated animate__backInRight"
            />
            <img
              src="./assets/images/ma.jpg"
              alt=""
              className="animate__animated animate__backInRight"
            />
          </div>
          <div className="notics">
            <h3 className="animate__animated animate__backInRight">Notics</h3>
            <p className="animate__animated animate__backInRight">
              Accuracy must be taken when recording the student’s doctoral data
              and registering the best active courses that provide the most
              beneficial value.
            </p>
          </div>
        </div>
      </div>
      <AcquisitionsChart />
    </>
  );
}

export default DashBoard;
