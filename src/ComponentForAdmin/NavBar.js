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
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
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
        `https://university-mohamed.vercel.app${routes.Training._id}${routes.Training.allTrainingByAdmin}?select=training_name,start_date,OpenForRegister,Training&page=${Page}&size=8&search=${training_value}&sort=Full_Name`,
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
        `https://university-mohamed.vercel.app${routes.course._id}${routes.course.searchCourseByAdmin}?page=${Page}&size=12&sort=course_name
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
        </div>
      </div>
    </>
  );
}

export default NavBar;
