import { React, useEffect, useState } from "react";
import "../styles/Dashboard.css";
import axios from "axios";
import { routes } from "../routes";

import TidioChat from "./TidioChat";
import TitleAnimation from "../Loader/TitleAnimation";
function Dashboard() {
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [studentnewspaper, setstudentnewspaper] = useState([]);
  const [totalgpa, settotalgpa] = useState("");
  const [totalhour, settotalhour] = useState("");
  const [level, setlevel] = useState("");
  const [trainingsRegistered, setTrainingsRegistered] = useState([]);
  const [coursesregisterd, setcoursesregisterd] = useState([]);
  const initialMessages = [
    { role: "user", text: "Hey, how are you today?" },
    { role: "ai", text: "I am doing very well!" },
  ];
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSemesterGrade = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.studentGrades._id}${routes.studentGrades.NewspaperBystudent}`,
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

        if (response.ok) {
          setLoading(false);
        } else {
          setLoading(false);
        }

        // Log the updated state
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchSemesterGrade();
  }, [accessToken, refreshToken]);
  console.log(studentnewspaper);

  // get total training registered
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.RegisterTraining._id}${routes.RegisterTraining.getTrainingRegisterdInfoTostu}`,
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
        setTrainingsRegistered(data.result[0].trainingRegisterd);
        if (response.ok) {
          setLoading(false);
        } else {
          setLoading(false);
        }
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
      setLoading(true);
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.courseRegister._id}${routes.courseRegister.GetRegisterInfoByStudent}`,
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
        if (response.ok) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  if (loading) {
    return <TitleAnimation />;
  }
  return (
    <>
      <div className="dashboard-container">
        <div className="coulmns">
          <div className="main-container">
            <div className="main">
              <i class="fa-solid fa-book-open" />
              <h3>
                {coursesregisterd.length > 0 ? coursesregisterd.length : 0}
              </h3>
              <p>Total courses</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-layer-group" />
              <h3>{studentnewspaper.length}</h3>
              <p>Total semesters</p>
            </div>
            <div className="main">
              <i class="fa-brands fa-stack-overflow" />
              <h3>
                {trainingsRegistered.length > 0
                  ? trainingsRegistered.length
                  : 0}
              </h3>
              <p>Total trainings</p>
            </div>
          </div>
          <div className="main-container">
            <div className="main">
              <i class="fa-brands fa-dribbble" />
              <h3>{totalgpa}</h3>
              <p>Total GPA</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-clock" />
              <h3>{totalhour}</h3>
              <p>Total hours</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-message" />
              <h3>8</h3>
              <p>Unread messages</p>
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
      <TidioChat />
    </>
  );
}

export default Dashboard;
