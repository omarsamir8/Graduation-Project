import "../styles/NavBar.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { routes } from "../routes";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
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
    // window.scrollTo(0, 750);
  };
  const navigate = useNavigate();
  function logout() {
    navigate("/");
    localStorage.clear();
  }
  const usenavigate = useNavigate();
  const NavigateToSemesterGrades = () => {
    usenavigate("/Semester_grade");
  };
  const NavigateToRegisteredCourses = () => {
    usenavigate("/Registered_Courses");
  };
  const NavigateToNewspaper = () => {
    usenavigate("/Reports_student");
  };

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

  //
  const handleCloseModal = () => {
    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }
    const modal = document.getElementById("staticBackdrop");
    if (modal) {
      modal.classList.remove("show");
      modal.removeAttribute("style"); // Remove any inline styles
    }

    // Re-enable scrolling on the body
    document.body.style.overflow = "auto";
  };

  // delete Photo
  const DeleteStudentImage = async () => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmed.isConfirmed) {
        const response = await axios.patch(
          `https://university-mohamed.vercel.app/Api/students/delete/image/from/student/By/student`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = response.data;
        console.log(data);

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Student image deleted successfully",
            showConfirmButton: false,
            timer: 3500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to delete student image",
            showConfirmButton: false,
            timer: 3500,
          });
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
      Swal.fire({
        icon: "error",
        title: "Failed to delete student image",
        text: error.response?.data?.message || "An error occurred",
        showConfirmButton: false,
        timer: 3500,
      });
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
                    type="button"
                    class="btn btn-danger"
                    onClick={() => {
                      DeleteStudentImage();
                    }}
                  >
                    Delete Image
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
                    style={{ marginRight: "40px" }}
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div className="item col-12">
                    <li
                      onClick={() => {
                        handleClick("DashBoard");
                        handleCloseModal();
                      }}
                      style={{
                        textDecoration: "none",
                        marginLeft: "2px",
                        color:
                          selectedComponent === "DashBoard"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent === "DashBoard"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                        cursor: "pointer",
                      }}
                      className="Side_li"
                    >
                      Dashboard
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      onClick={() => {
                        handleClick("RegisterForCourse");
                        handleCloseModal();
                      }}
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
                        marginLeft: "20px",
                        cursor: "pointer",
                      }}
                      className="Side_li"
                    >
                      Register For Course
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      style={{
                        color: "black",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        NavigateToRegisteredCourses();
                        handleCloseModal();
                      }}
                      className="NavLink"
                    >
                      Registered Courses
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      onClick={() => {
                        handleClick("RegisterForTraining");
                        handleCloseModal();
                      }}
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
                        cursor: "pointer",
                      }}
                      className="Side_li"
                    >
                      Register For Training
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      onClick={() => {
                        handleClick("RegisteredTraining");
                        handleCloseModal();
                      }}
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
                        cursor: "pointer",
                      }}
                      className="Side_li"
                    >
                      Registered Training
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      style={{
                        color: "black",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        NavigateToSemesterGrades();
                        handleCloseModal();
                      }}
                      className="NavLink"
                    >
                      Semester Grades
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      style={{
                        color: "black",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        NavigateToNewspaper();
                        handleCloseModal();
                      }}
                      className="NavLink"
                    >
                      Newspaper
                    </li>
                  </div>
                  <div className="item col-12">
                    <NavLink
                      style={{
                        color: "black",
                        marginLeft: "-10px",
                        cursor: "pointer",
                      }}
                      className="NavLink"
                      onClick={() => {
                        setSelectedComponent("Department");
                        handleCloseModal();
                      }}
                    >
                      Department
                    </NavLink>
                  </div>
                  <div className="item col-12">
                    <NavLink
                      className="NavLink"
                      style={{
                        color: "black",
                        marginLeft: "-10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedComponent("Attendece");
                        handleCloseModal();
                      }}
                    >
                      Attendece
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
                  <p onClick={logout} className="logout_Button">
                    Logout
                  </p>
                </div>
                <div class="modal-footer">
                  <button
                    style={{ marginRight: "50px" }}
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
            {/* <i class="fa-solid fa-circle-chevron-down"></i> */}
            {/* <i class="fa-solid fa-info"></i> */}
            <i
              style={{
                fontSize: "25px",
                cursor: "pointer",
                marginTop: "-8px",
                marginLeft: "0",
              }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModa2"
              class="fa-solid fa-arrow-down"
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
                    style={{ marginRight: "40px", marginTop: "-45px" }}
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
                    style={{ marginRight: "50px" }}
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
