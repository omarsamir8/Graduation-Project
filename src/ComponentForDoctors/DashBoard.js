import { React, useEffect, useState } from "react";
import "../styles/Dashboard.css";
import axios from "axios";
import { routes } from "../routes";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [selectedComponent2, setSelectedComponent2] = useState(null);
  const handleSidebarClick = (componentName) => {
    setSelectedComponent2(componentName);
  };
  const [doctorMatarials, setdoctorMatarials] = useState([]);
  const [doctorTrainings, setdoctorTrainings] = useState([]);
  const usenavigate = useNavigate();
  const NavigateToScan = () => {
    usenavigate("/Scan");
  };
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  // get doctor matarial
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
        setdoctorMatarials(response.data.user.Materials);
        setdoctorTrainings(response.data.user.Training);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
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
              <h3>{doctorMatarials.length}</h3>
              <p>Number of courses</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-check" />
              <h3>400</h3>
              <p>Successful students </p>
            </div>
            <div className="main">
              <i class="fa-solid fa-square-xmark" />
              <h3>20</h3>
              <p> Fallen student </p>
            </div>
          </div>
          <div className="main-container">
            <div className="main">
              <i class="fa-brands fa-stack-overflow" />
              <h3>{doctorTrainings.length}</h3>
              <p>Number of trainings</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-check" />
              <h3>300</h3>
              <p>Successfull students</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-square-xmark" />
              <h3>25</h3>
              <p>Fallen student</p>
            </div>
          </div>
        </div>

        <div className="instructor">
          <div className="title">
            <p>Some Courses </p>
          </div>
          <div className="images">
            <img src="./assets/images/4.png" alt="" />
            <img src="./assets/images/5.png" alt="" />
            <img src="./assets/images/6.jpg" alt="" />
          </div>
          <div className="notics">
            <h3>Notics</h3>
            <p>
              Courses must be given to students in an easy and simple way so
              that students understand them and help them develop their
              understanding in these courses.
            </p>
          </div>
        </div>
        {/* <button onClick={NavigateToScan}></button> */}
      </div>
    </>
  );
}

export default Dashboard;
