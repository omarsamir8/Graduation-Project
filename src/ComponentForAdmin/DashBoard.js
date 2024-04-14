import { React, useEffect, useState } from "react";
import "../styles/Dashboard.css";
import AdminTidioChat from "./AdminChat";
function DashBoard() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [allstudents, setallstudents] = useState([]);
  const [alldoctors, setalldoctors] = useState([]);
  const [allcourses, setallcourses] = useState([]);
  const [alltraining, setalltraining] = useState([]);
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
          "https://university-mohamed.vercel.app/Api/user/searchuser?select=Full_Name,Student_Code,semesterId,PhoneNumber&size=20",
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
          "https://university-mohamed.vercel.app/Api/instructor/search?sort=1&select=email,FullName,Materials&size=20",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = await response.json();
        setalldoctors(data.Instructors);
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
          "https://university-mohamed.vercel.app/Api/courses/searchcourse?size=20",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = await response.json();
        setallcourses(data.courses);
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
  // get all training
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://university-mohamed.vercel.app/Api/training/alltraining?select=training_name&page=1&size=9",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = await response.json();
        setalltraining(data.trainings);
        console.log(data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    console.log(alltraining);
  }, [alltraining]);

  return (
    <>
      <div className="dashboard-container">
        <div className="coulmns">
          <div className="main-container">
            <div className="main">
              <i class="fa-solid fa-book-open"></i>
              <h3 className="animate__animated animate__backInDown">
                {allstudents.length}
              </h3>
              <p className="animate__animated animate__backInDown">
                Total Students
              </p>
            </div>
            <div className="main">
              <i class="fa-solid fa-check"></i>
              <h3 className="animate__animated animate__backInDown">
                {alldoctors.length}
              </h3>
              <p className="animate__animated animate__backInDown">
                Total Doctor{" "}
              </p>
            </div>
            <div className="main">
              <i class="fa-solid fa-square-xmark"></i>
              <h3 className="animate__animated animate__backInDown">
                {allcourses.length}
              </h3>
              <p className="animate__animated animate__backInDown">
                {" "}
                Total Courses{" "}
              </p>
            </div>
          </div>
          <div className="main-container">
            <div className="main">
              <i class="fa-brands fa-stack-overflow"></i>
              <h3 className="animate__animated animate__backInDown">
                {alltraining.length}
              </h3>
              <p className="animate__animated animate__backInDown">
                Total Training
              </p>
            </div>
            <div className="main">
              <i class="fa-solid fa-check"></i>
              <h3 className="animate__animated animate__backInDown">Done</h3>
              <p className="animate__animated animate__backInDown">
                State Of Schedule
              </p>
            </div>
            <div className="main">
              <i class="fa-solid fa-message"></i>
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
<AdminTidioChat/>
    </>
  );
}

export default DashBoard;
