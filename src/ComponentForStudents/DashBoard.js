import { React, useEffect, useState } from "react";
import "../styles/Dashboard.css";
import axios from "axios";
function Dashboard() {
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [studentnewspaper, setstudentnewspaper] = useState([]);
  const [totalgpa, settotalgpa] = useState("");
  const [totalhour, settotalhour] = useState("");
  const [level, setlevel] = useState("");
  const [trainingsRegistered, setTrainingsRegistered] = useState([]);
  const [coursesregisterd, setcoursesregisterd] = useState([]);
  useEffect(() => {
    const fetchSemesterGrade = async () => {
      try {
        const response = await axios.get(
          "https://university-mohamed.vercel.app/Api/student/Grades/stugrades",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setstudentnewspaper(response.data.semesters);
        settotalgpa(response.data.totalGpaOverall);
        settotalhour(response.data.totalCreditHours);
        setlevel(response.data.level);

        // Log the updated state
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchSemesterGrade();
  }, [accessToken, refreshToken]);
  console.log(studentnewspaper);

  //get total training registered
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app/Api/Register/Training/getTrainingInfo`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        const data = await response.json();
        setTrainingsRegistered(data.result.trainingRegisterd);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  console.log(trainingsRegistered);

  // get registerd courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app/Api/student/register/getRegister`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setcoursesregisterd(data.register.coursesRegisterd);
        console.log(coursesregisterd);
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
              <i class="fa-solid fa-book-open"></i>
              <h3>{coursesregisterd.length}</h3>
              <p>Total Course</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-layer-group"></i>
              <h3>{studentnewspaper.length}</h3>
              <p>Total Semester</p>
            </div>
            <div className="main">
              <i class="fa-brands fa-stack-overflow"></i>
              <h3>{trainingsRegistered.length}</h3>
              <p>Total Training</p>
            </div>
          </div>
          <div className="main-container">
            <div className="main">
              <i class="fa-brands fa-dribbble"></i>
              <h3>{totalgpa}</h3>
              <p>Total GPA</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-clock"></i>
              <h3>{totalhour}</h3>
              <p>Total Hours</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-message"></i>
              <h3>8</h3>
              <p>unread messages</p>
            </div>
          </div>
        </div>

        <div className="instructor">
          <div className="title">
            <p>Course instructor</p>
          </div>
          <div className="images">
            <img src="./assets/images/1.png" alt="" />
            <img src="./assets/images/2.png" alt="" />
            <img src="./assets/images/3.png" alt="" />
          </div>
          <div className="notics">
            <h3>Notics</h3>
            <p>
              You must go to the college or contact the Shawan to obtain your
              card so that you can register the courses and training and obtain
              your results.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
