import { React } from "react";
import "../styles/Dashboard.css";
function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        <div className="coulmns">
          <div className="main-container">
            <div className="main">
              <i class="fa-solid fa-book-open"></i>
              <h3>3685</h3>
              <p>Total Students</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-check"></i>
              <h3>40</h3>
              <p>Total Doctor </p>
            </div>
            <div className="main">
              <i class="fa-solid fa-square-xmark"></i>
              <h3>80</h3>
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

export default Dashboard;
