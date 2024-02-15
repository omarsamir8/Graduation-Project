import { useNavigate } from "react-router-dom";
import "../styles/SideBar.css";
function SideBar() {
  const navigate = useNavigate();
  function logout() {
    navigate("/");
    localStorage.clear();
  }
  return (
    <>
      <div className="sidebar-container">
        <div className="icon-container">
          {/* <i class="fa-solid fa-graduation-cap"></i> */}
          <img src="./assets/images/art.jpeg" alt=""></img>
        </div>
        <div className="item">
          <i class="fa-solid fa-gauge"></i>
          <a href="#dashboard">Dashboard</a>
        </div>
        <div className="item">
          <i class="fa-solid fa-registered"></i>
          <a href="#createstudent"> Add Students</a>
        </div>
        <div className="item">
          <i class="fa-solid fa-registered"></i>
          <a href="#allstudent"> All Student</a>
        </div>
        <div className="item">
          <i class="fa-solid fa-registered"></i>
          <a href="#createdoctor"> Add Doctors</a>
        </div>
        <div className="item">
          <i class="fa-solid fa-registered"></i>
          <a href="#alldoctor"> All Doctors</a>
        </div>
        <div className="item">
          <i class="fa-solid fa-book-open"></i>
          <a href="#createcourse">Add Courses</a>
        </div>
        <div className="item">
          <i class="fa-brands fa-stack-overflow"></i>
          <a href="#createtraining">Add Training</a>
        </div>
        <div className="item">
          <i class="fa-brands fa-stack-overflow"></i>
          <a href="#schedule">Add Schedule</a>
        </div>

        <div className="item">
          <i class="fa-solid fa-message"></i>
          <a href="#chat">Chat</a>
        </div>
        <div className="login">
          <i class="fa-solid fa-right-from-bracket"></i>
          <a href="#login" onClick={logout}>
            Logout
          </a>
        </div>
      </div>
    </>
  );
}
export default SideBar;
