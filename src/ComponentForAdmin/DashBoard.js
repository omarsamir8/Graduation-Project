import { React, useEffect, useState } from "react";
import "../styles/Dashboard.css";
function DashBoard() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [allstudents, setallstudents] = useState([]);
  const [alldoctors, setalldoctors] = useState([]);
  const [allcourses, setallcourses] = useState([]);
  const handleSidebarClick = (componentName) => {
    setSelectedComponent(componentName);
  };

  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  // get all students
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://university-lyart.vercel.app/Api/user/searchuser?select=Full_Name,Student_Code,semesterId,PhoneNumber&size=20",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = await response.json();
        setallstudents(data.students);
        console.log(data.students);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  // get all doctors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://university-lyart.vercel.app/Api/instructor/search?sort=1&select=email,FullName,Materials&size=20",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = await response.json();
        setalldoctors(data.Instructor);
        console.log(data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    console.log(alldoctors);
  }, [alldoctors]);
  // get all courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://university-lyart.vercel.app/Api/courses/searchcourse?size=20",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = await response.json();
        setallcourses(data.course);
        console.log(data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    console.log(allcourses);
  }, [allcourses]);
  return (
    <>
      <div className="dashboard-container">
        <div className="coulmns">
          <div className="main-container">
            <div className="main">
              <i class="fa-solid fa-book-open"></i>
              <h3>{allstudents.length}</h3>
              <p>Total Students</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-check"></i>
              <h3>{alldoctors.length}</h3>
              <p>Total Doctor </p>
            </div>
            <div className="main">
              <i class="fa-solid fa-square-xmark"></i>
              <h3>{allcourses.length}</h3>
              <p> Total Courses </p>
            </div>
          </div>
          <div className="main-container">
            <div className="main">
              <i class="fa-brands fa-stack-overflow"></i>
              <h3>8</h3>
              <p>Total Training</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-check"></i>
              <h3>Done</h3>
              <p>State Of Schedule</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-message"></i>
              <h3>3</h3>
              <p>unreaded messages</p>
            </div>
          </div>
        </div>

        <div className="instructor">
          <div className="title">
            <p>Some Training </p>
          </div>
          <div className="images">
            <img src="./assets/images/flutter.png" alt="" />
            <img src="./assets/images/web.avif" alt="" />
            <img src="./assets/images/ma.jpg" alt="" />
          </div>
          <div className="notics">
            <h3>Notics</h3>
            <p>
              Accuracy must be taken when recording the student’s doctoral data
              and registering the best active courses that provide the most
              beneficial value.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
