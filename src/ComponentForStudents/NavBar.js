import "../styles/NavBar.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { routes } from "../routes";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { $Dashboard_Components } from "../Atoms";
import { useRecoilState } from "recoil";
import { NavLink } from "react-bootstrap";
function NavBar() {
  const [studentinfo, setStudentInfo] = useState([]);
  const [studentImage, setstudentImage] = useState("");
  const [message, setmessage] = useState("");
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // const [SelectedComponent, SetSelectedComponent] = useState(null);

  const handleClick = (componentName) => {
    setSelectedComponent(componentName);
    window.scrollTo(0, 750);
  };
  function logout() {
    Navigate("/");
    localStorage.clear();
  }

  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard_Components
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.student._id}${routes.student.getInfo}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setStudentInfo(response.data.result);
        console.log(studentinfo);
        // Log the updated state
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  console.log(studentinfo);

  // Upload Student Photo
  const uploadstudentimage = async () => {
    try {
      const formData = new FormData();
      formData.append("studentImage", studentImage);

      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.student._id}${routes.student.AddImgByStu}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      setmessage(data.message);
      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Student Image added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Student Image creation failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  return (
    <>
      <div className="nav-bar">
        <div className="search">
          <input type="text" placeholder="Search" />
        </div>
        <div className="info">
          <img
            type="button"
            class=""
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            src={studentinfo.url}
            alt=""
          />

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Upload Photo
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div class="modal-body">
                  <input
                    class="form-control"
                    type="file"
                    placeholder="Default input"
                    aria-label="default input example"
                    onChange={(e) => {
                      setstudentImage(e.target.files[0]);
                    }}
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      uploadstudentimage();
                    }}
                    type="button"
                    class="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="details">
            <h3>{studentinfo.Full_Name}</h3>
            <p> Level : {studentinfo.level}</p>
          </div>

          <button
            type="button"
            class="btn dropdown"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <i
              style={{ fontSize: "35px", marginTop: "-5px" }}
              class="fa-solid fa-list "
            ></i>
          </button>

          <div
            class="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div style={{ width: "400px" }} class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    SideBar
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div className="item col-12">
                    <li
                      onClick={() => handleClick("DashBoard")}
                      style={{
                        textDecoration: "none",
                        marginLeft: "5px",
                        color:
                          selectedComponent === "DashBoard"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent === "DashBoard"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                      }}
                      className="Side_li"
                    >
                      Dashboard
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      onClick={() => handleClick("RegisterForCourse")}
                      style={{
                        textDecoration: "none",
                        color:
                          selectedComponent === "RegisterForCourse"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent === "RegisterForCourse"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                      }}
                      className="Side_li"
                    >
                      Register For Course
                    </li>
                  </div>
                  <div className="item col-12">
                    <NavLink
                      style={{ color: "black", marginLeft: "-10px" }}
                      onClick={Navigate("/Registered_Courses")}
                      className="NavLink"
                    >
                      Registered Courses
                    </NavLink>
                  </div>
                  <div className="item col-12">
                    <li
                      onClick={() => handleClick("RegisterForTraining")}
                      style={{
                        textDecoration: "none",
                        color:
                          selectedComponent === "RegisterForTraining"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent === "RegisterForTraining"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                      }}
                      className="Side_li"
                    >
                      Register For Training
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      onClick={() => handleClick("RegisteredTraining")}
                      style={{
                        textDecoration: "none",
                        color:
                          selectedComponent === "RegisteredTraining"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent === "RegisteredTraining"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                      }}
                      className="Side_li"
                    >
                      Registered Training
                    </li>
                  </div>
                  <div className="item col-12">
                    <NavLink
                      style={{ color: "black", marginLeft: "-10px" }}
                      to="/Semester_grade"
                      className="NavLink"
                    >
                      Semester Grades
                    </NavLink>
                  </div>
                  <div className="item col-12">
                    <NavLink
                      style={{ color: "black", marginLeft: "-10px" }}
                      to="/Reports_student"
                      className="NavLink"
                    >
                      Newspaper
                    </NavLink>
                  </div>
                  <div className="item col-12">
                    <NavLink
                      style={{ color: "black", marginLeft: "-10px" }}
                      className="NavLink"
                      onClick={() => setSelectedComponent("Department")}
                    >
                      Department
                    </NavLink>
                  </div>

                  <div className="item col-12">
                    <NavLink
                      style={{ color: "black", marginLeft: "-10px" }}
                      className="NavLink"
                    >
                      Chat
                    </NavLink>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <i
              style={{
                fontSize: "30px",
                cursor: "pointer",
                marginLeft: "-10px",
              }}
              class="fa-solid fa-circle-chevron-down"
              data-bs-toggle="modal"
              data-bs-target="#exampleModa2"
            ></i>
          </div>

          <div
            class="modal fade"
            id="exampleModa2"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div style={{ width: "400px" }} class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5
                    style={{
                      marginBottom: "50px",
                      fontWeight: "bold",
                      fontFamily: "cursive",
                      fontSize: "25px",
                    }}
                    class="modal-title"
                    id="exampleModalLabel"
                  >
                    Profile Information{" "}
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div class="modal-body">
                  <img
                    style={{
                      width: "120px",
                      height: "120px",
                      marginTop: "-70px",
                    }}
                    type="button"
                    class=""
                    src={studentinfo.url}
                    alt=""
                  />
                  <div>
                    <p style={{ color: "gray" }}>Name</p>
                    <h3
                      style={{
                        marginTop: "-25px",
                        fontFamily: "cursive",
                        fontSize: "22px",
                      }}
                    >
                      {studentinfo.Full_Name}
                    </h3>
                  </div>
                  <div>
                    <p style={{ color: "gray" }}>Faculty</p>
                    <h3
                      style={{
                        marginTop: "-20px",
                        fontFamily: "cursive",
                        fontSize: "22px",
                      }}
                    >
                      Faculty of computers and artificial intelligence
                    </h3>
                  </div>
                  <hr />
                  <div>
                    <p style={{ color: "gray" }}>Student Code</p>
                    <h3
                      style={{
                        marginTop: "-20px",
                        fontFamily: "cursive",
                        fontSize: "22px",
                      }}
                    >
                      {studentinfo.Student_Code}
                    </h3>
                  </div>
                  <div>
                    <p style={{ color: "gray" }}>National ID</p>
                    <h3
                      style={{
                        marginTop: "-20px",
                        fontFamily: "cursive",
                        fontSize: "22px",
                      }}
                    >
                      {studentinfo.National_Id}
                    </h3>
                  </div>
                  <hr />
                  <div>
                    <p style={{ color: "gray" }}>Date Of Birth </p>
                    <h3
                      style={{
                        marginTop: "-20px",
                        fontFamily: "cursive",
                        fontSize: "22px",
                      }}
                    >
                      {new Date(studentinfo.Date_of_Birth).toLocaleDateString()}
                    </h3>
                  </div>
                  <div>
                    <p style={{ color: "gray" }}> Gender </p>
                    <h3
                      style={{
                        marginTop: "-20px",
                        fontFamily: "cursive",
                        fontSize: "22px",
                      }}
                    >
                      {studentinfo.gender}
                    </h3>
                  </div>
                  <hr />
                  <div>
                    <p style={{ color: "gray" }}> Main Semester </p>
                    <h3
                      style={{
                        marginTop: "-20px",
                        fontFamily: "cursive",
                        fontSize: "22px",
                      }}
                    >
                      {studentinfo.semsterInfo
                        ? studentinfo.semsterInfo.name
                        : null}
                    </h3>
                  </div>
                  <div>
                    <p style={{ color: "gray" }}> Total Credit Hour </p>
                    <h3
                      style={{
                        marginTop: "-20px",
                        fontFamily: "cursive",
                        fontSize: "22px",
                      }}
                    >
                      {studentinfo.totalCreditHours}
                    </h3>
                  </div>
                </div>
                <div style={{ marginBottom: "30px" }} class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default NavBar;
