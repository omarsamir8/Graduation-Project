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
        <div className="item col-12">
          <i class="fa-solid fa-gauge"></i>
          <p>Dashboard</p>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-registered"></i>
          <p> Department</p>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-book-open"></i>
          <p>Courses</p>
        </div>
        <div className="item col-12">
          <i class="fa-brands fa-stack-overflow"></i>
          <p> Training</p>
        </div>
        <div className="item col-12">
          <i class="fa-solid fa-address-card"></i>
          <p>Results</p>
        </div>

        <div className="login col-12">
          <i class="fa-solid fa-right-from-bracket"></i>
          <p onClick={logout}>
            Logout
          </p>
        </div>
      </div>
    </>
  );
}
export default SideBar;
