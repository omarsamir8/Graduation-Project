import "../styles/NavBar.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { routes } from "../routes";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { $Dashboard2_Components, $Dashboard_Components } from "../Atoms";
import { useRecoilState } from "recoil";
function NavBar() {
  const [doctorinfo, setDoctorInfo] = useState([]);
  const [instructorImage, setinstructorImage] = useState([]);
  const [message, setmessage] = useState("");
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const handleClick = (componentName) => {
    setSelectedComponent2(componentName);
    window.scrollTo(0, 750);
  };
  function logout() {
    Navigate("/");
    localStorage.clear();
  }
  const [selectedComponent2, setSelectedComponent2] = useRecoilState(
    $Dashboard2_Components
  );

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
        setDoctorInfo(response.data.user);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  // Upload Doctor Photo
  const uploadDoctorimage = async () => {
    try {
      const formData = new FormData();
      formData.append("instructorImage", instructorImage);

      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.instructor._id}${routes.instructor.AddImgByInstructor}`,
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
          title: "Doctor Image added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Doctor Image creation failed, please try again later",
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
            src={doctorinfo.urlImg}
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
                    aria-label="instructorImage"
                    name="instructorImage"
                    onChange={(e) => {
                      setinstructorImage(e.target.files[0]);
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
                      uploadDoctorimage();
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
            <h3>{doctorinfo.FullName}</h3>
            <p>{doctorinfo.role}</p>
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
                        color:
                          selectedComponent2 === "DashBoard"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent2 === "DashBoard"
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
                      onClick={() => handleClick("courses")}
                      style={{
                        textDecoration: "none",
                        color:
                          selectedComponent2 === "courses"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent2 === "courses"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                      }}
                      className="Side_li"
                    >
                      Courses
                    </li>
                  </div>
                  <div className="item col-12">
                    <li
                      onClick={() => handleClick("Training")}
                      style={{
                        textDecoration: "none",
                        color:
                          selectedComponent2 === "Training"
                            ? "black"
                            : "inherit",
                        transform:
                          selectedComponent2 === "Training"
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
                      }}
                      className="Side_li"
                    >
                      Training
                    </li>
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
                marginBottom: "5px",
              }}
              class="fa-solid fa-circle-chevron-down"
              data-bs-toggle="modal"
              data-bs-target="#exampleModa2"
            ></i>
          </div>

          <div
            style={{ marginLeft: "450px", marginTop: "50px" }}
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
                    src={doctorinfo.urlImg}
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
                      {doctorinfo.FullName}
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
                      {doctorinfo.email}
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
                      {doctorinfo.role}
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
                      {new Date(doctorinfo.Date_of_Birth).toLocaleDateString()}
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
                      {doctorinfo.gender}
                    </h3>
                  </div>
                  <hr />
                  <div>
                    <p style={{ color: "gray" }}> Department </p>
                    <h3
                      style={{
                        marginTop: "-20px",
                        fontFamily: "cursive",
                        fontSize: "22px",
                      }}
                    >
                      {doctorinfo.department}
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
                      {doctorinfo.phone}
                    </h3>
                  </div>
                  <hr />
                  <div>
                    <p style={{ color: "gray" }}> Materials</p>
                    {doctorinfo.Materials
                      ? doctorinfo.Materials.map((mat) => {
                          return (
                            <h3
                              style={{
                                marginTop: "-10px",
                                fontFamily: "cursive",
                                fontSize: "22px",
                              }}
                            >
                              {mat.course_name}
                            </h3>
                          );
                        })
                      : null}
                  </div>
                  <div>
                    <p style={{ color: "gray" }}> Training</p>
                    {doctorinfo.Training
                      ? doctorinfo.Training.map((mat) => {
                          return (
                            <h3
                              style={{
                                marginTop: "-10px",
                                fontFamily: "cursive",
                                fontSize: "22px",
                              }}
                            >
                              {mat.training_name}
                            </h3>
                          );
                        })
                      : null}
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
