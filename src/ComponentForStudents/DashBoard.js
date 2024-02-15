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
              <h3>24</h3>
              <p>Total Course</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-layer-group"></i>
              <h3>4</h3>
              <p>Total Semester</p>
            </div>
            <div className="main">
              <i class="fa-brands fa-stack-overflow"></i>
              <h3>2</h3>
              <p>Total Training</p>
            </div>
          </div>
          <div className="main-container">
            <div className="main">
              <i class="fa-brands fa-dribbble"></i>
              <h3>3.2</h3>
              <p>Total GPA</p>
            </div>
            <div className="main">
              <i class="fa-solid fa-clock"></i>
              <h3>72</h3>
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
