import "../styles/NavBar.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useStudentContext } from "../StudentContext";
import { useDoctorContext } from "../DoctorContext";
import { useTrainingContext } from "../TrainingContext";
import { useCourseContext } from "../CourseContext";
import { routes } from "../routes";
import Swal from "sweetalert2";
import { usePageContext } from "../PageContext";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { $Dashboard_Components } from "../Atoms";
import { useRecoilState } from "recoil";
import TitleAnimation from "../Loader/TitleAnimation";

function NavBar() {
  const [admininfo, setadmininfo] = useState([]);
  const [messgae, setmessage] = useState("");
  const [adminImage, setadminImage] = useState([]);
  const [search_student_value, setsearch_student_value] = useState("");
  const [doctor_value, setdoctor_value] = useState("");
  const [training_value, settraining_value] = useState("");
  const [course_value, setcourse_value] = useState("");
  const [count, setcount] = useState(1);
  const { allcourses, setallcourses } = useCourseContext();
  const { allTrainings, setAllTrainings } = useTrainingContext();
  const { allstudents, setallstudents } = useStudentContext();
  let { Page, setPage } = usePageContext();
  const { alldoctors, setalldoctors } = useDoctorContext();
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [imgName, setimgName] = useState("");
  const handleClick = (componentName) => {
    setSelectedComponent(componentName);
    window.scrollTo(0, 750);
  };
  const navigate = useNavigate();
  function logout() {
    navigate("/");
    localStorage.clear();
  }

  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard_Components
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.Admin._id}${routes.Admin.getinfoAdmin}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        console.log(response.data);
        setadmininfo(response.data.user);
        setimgName(response.data.user.urlImg);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  console.log(imgName);
  // search for students
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://university-mohamed.vercel.app${routes.student._id}${routes.student.searchstudent}?page=${Page}&size=12&search=${search_student_value}&sort=Full_Name`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );

      console.log(response.data);
      setallstudents(response.data.students);
    } catch (error) {
      console.error("Error fetching admin info:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [Page, accessToken, refreshToken, search_student_value]);
  console.log(allstudents);
  // search for doctor
  const fetchDataa = async () => {
    try {
      const response = await axios.get(
        `https://university-mohamed.vercel.app${routes.instructor._id}${routes.instructor.searchInstructor}?page=${Page}&size=12&search=${doctor_value}&sort=FullName`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );

      console.log(response.data);
      setalldoctors(response.data.Instructors);
    } catch (error) {
      console.error("Error fetching admin info:", error);
    }
  };
  useEffect(() => {
    fetchDataa();
  }, [Page, accessToken, refreshToken, search_student_value]);
  console.log(alldoctors);
  // search for training
  const fetchsearchfortraining = async () => {
    try {
      // if (searchvalue.trim() !== "") {
      const response = await axios.get(
        `https://university-mohamed.vercel.app/Api/trainings/get/all/trainings/info/by/admin?select=training_name,start_date,OpenForRegister,Training,ImgUrls&page=${Page}&size=8&search=${training_value}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response.data);
      const data = response.data;
      console.log(data);
      setAllTrainings(data.trainings);

      // Here you can update the state related to the search or perform any other actions with the data
    } catch (error) {
      // }
      console.error("Error fetching search results:", error);
    }
  };
  useEffect(() => {
    fetchsearchfortraining();
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        fetchsearchfortraining();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [accessToken, refreshToken, training_value, Page]);
  console.log(allTrainings);
  // serach for course
  const fetchsearchforcourse = async () => {
    try {
      // if (searchvalue.trim() !== "") {
      const response = await axios.get(
        `https://university-mohamed.vercel.app${routes.course._id}${routes.course.searchCourseByAdmin}?page=${Page}&size=12
          &search=${training_value}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response.data);
      const data = response.data;
      console.log(data);
      setallcourses(data.courses);
      console.log(allcourses);

      // Here you can update the state related to the search or perform any other actions with the data
    } catch (error) {
      // }
      console.error("Error fetching search results:", error);
    }
  };
  useEffect(() => {
    fetchsearchforcourse();
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        fetchsearchforcourse();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [Page, accessToken, refreshToken, course_value]);

  // Upload Doctor Photo
  const uploadAdminimage = async () => {
    try {
      const formData = new FormData();
      formData.append("adminImage", adminImage);

      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.Admin._id}${routes.Admin.AddImgByAdmin}`,
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
          title: "Admin Image added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Admin Image creation failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  //close model after click
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

  const DeleteAdminImage = async () => {
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
          `https://university-mohamed.vercel.app/Api/admins/delete/image/from/admin/by/admin`,
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
            title: "Admin image deleted successfully",
            showConfirmButton: false,
            timer: 3500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to delete admin image",
            showConfirmButton: false,
            timer: 3500,
          });
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
      Swal.fire({
        icon: "error",
        title: "Failed to delete admin image",
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
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              setsearch_student_value(e.target.value);
              setdoctor_value(e.target.value);
              settraining_value(e.target.value);
              setcourse_value(e.target.value);
            }}
          />
        </div>
        <div className="info">
          <img
            type="button"
            class=""
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            src={admininfo.urlImg}
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
                    type="file"
                    class="form-control mt-3"
                    placeholder="Enter Doctor Image"
                    aria-label="adminImage"
                    name="adminImage"
                    onChange={(e) => {
                      setadminImage(e.target.files[0]);
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
                      DeleteAdminImage();
                    }}
                  >
                    Delete Image
                  </button>
                  <button
                    onClick={() => {
                      uploadAdminimage();
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
            <h3>{admininfo.FullName}</h3>
            <p>{admininfo.role}</p>
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
                    style={{ marginRight: "50px" }}
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
                      onClick={() => {
                        handleClick("CreateStudent");
                        handleCloseModal();
                      }}
                      style={{
                        textDecoration: "none",
                        color:
                          selectedComponent === "CreateStudent"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent === "CreateStudent"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                      }}
                      className="Side_li"
                    >
                      Add Student
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      onClick={() => {
                        handleClick("All_Students");
                        handleCloseModal();
                      }}
                      style={{
                        textDecoration: "none",
                        color:
                          selectedComponent === "All_Students"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent === "All_Students"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                      }}
                      className="Side_li"
                    >
                      All Students
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      onClick={() => {
                        handleClick("CreateDoctor");
                        handleCloseModal();
                      }}
                      style={{
                        textDecoration: "none",
                        color:
                          selectedComponent === "CreateDoctor"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent === "CreateDoctor"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                      }}
                      className="Side_li"
                    >
                      Add Doctor
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      onClick={() => {
                        handleClick("AllDoctors");
                        handleCloseModal();
                      }}
                      style={{
                        textDecoration: "none",
                        color:
                          selectedComponent === "AllDoctors"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent === "AllDoctors"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                      }}
                      className="Side_li"
                    >
                      All Doctors
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      onClick={() => {
                        handleClick("CreateCourse");
                        handleCloseModal();
                      }}
                      style={{
                        textDecoration: "none",
                        color:
                          selectedComponent === "CreateCourse"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent === "CreateCourse"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                      }}
                      className="Side_li"
                    >
                      Add Course
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      onClick={() => {
                        handleClick("CreateTraining");
                        handleCloseModal();
                      }}
                      style={{
                        textDecoration: "none",
                        color:
                          selectedComponent === "CreateTraining"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent === "CreateTraining"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                      }}
                      className="Side_li"
                    >
                      Add Training
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      onClick={() => {
                        handleClick("CreateSemester");
                        handleCloseModal();
                      }}
                      style={{
                        textDecoration: "none",
                        color:
                          selectedComponent === "CraeteSemester"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent === "CraeteSemester"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                      }}
                      className="Side_li"
                    >
                      Add Semester
                    </li>
                  </div>

                  <div className="item col-12">
                    <li
                      onClick={() => {
                        handleClick("setting");
                        handleCloseModal();
                      }}
                      style={{
                        textDecoration: "none",
                        color:
                          selectedComponent === "setting" ? "black" : "inherit",
                        transform:
                          selectedComponent === "setting"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                      }}
                      className="Side_li"
                    >
                      Setting
                    </li>
                  </div>
                  <p onClick={logout} className="logout_Button">
                    Logout
                  </p>
                </div>
                <div class="modal-footer">
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
          <div>
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
            // style={{ marginLeft: "450px", marginTop: "50px" }}
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
                    src={admininfo.urlImg}
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
                      {admininfo.FullName}
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
                    <p style={{ color: "gray" }}>Email </p>
                    <h3
                      style={{
                        marginTop: "-20px",
                        fontFamily: "cursive",
                        fontSize: "22px",
                      }}
                    >
                      {admininfo.email}
                    </h3>
                  </div>
                  <div>
                    <p style={{ color: "gray" }}>Role </p>
                    <h3
                      style={{
                        marginTop: "-20px",
                        fontFamily: "cursive",
                        fontSize: "22px",
                      }}
                    >
                      {admininfo.role}
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
                      {new Date(admininfo.Date_of_Birth).toLocaleDateString()}
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
                      {admininfo.gender}
                    </h3>
                  </div>

                  <div>
                    <p style={{ color: "gray" }}> Phone </p>
                    <h3
                      style={{
                        marginTop: "-20px",
                        fontFamily: "cursive",
                        fontSize: "22px",
                      }}
                    >
                      {admininfo.phone}
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
