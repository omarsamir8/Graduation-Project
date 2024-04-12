import React, { useEffect, useState } from "react";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
import Select from "react-select";

import Swal from "sweetalert2";
import { useCourseContext } from "../CourseContext";

function CreateCourse() {
  const [course_name, setcourse_name] = useState("");
  const [Prerequisites, setPrerequisites] = useState([]);
  const [credit_hour, setcredit_hour] = useState("");
  const [OpenForRegistration, setOpenForRegistration] = useState("");
  const [desc, setdesc] = useState("");
  const { allcourses, setallcourses } = useCourseContext();
  const [allcoursees, setallcoursees] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [message, setmessage] = useState("");

  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // create course
  const createcourse = async () => {
    try {
      const response = await fetch(
        "https://university-mohamed.vercel.app/Api/courses/addcourse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            course_name,
            credit_hour,
            OpenForRegistration,
            desc,
            Prerequisites,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setmessage(data.message);
      console.log(data.message);

      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Course added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        // Show an error message if needed
        if (data.message === "Course name already exists") {
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: `${data.message}`,
            timer: 4500,
          });
        } else if (data.message === "validation Error") {
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: `other error`,
            timer: 4500,
          });
        }
      }
    } catch (error) {
      console.error("Create course failed", error);
    }
  };

  // get all Courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app/Api/courses/searchcourse?&size=20`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        const data = await response.json();
        if (Array.isArray(data.course)) {
          setallcoursees((prevCourses) => [...prevCourses, ...data.course]);
        }
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    console.log(allcoursees);
  }, [allcoursees]);

  // delete course
  const deleteCourse = async (courseId) => {
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
        const response = await fetch(
          `https://university-mohamed.vercel.app/Api/courses/deletecourse?courseId=${courseId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        if (response.ok) {
          // On success, update the state to remove the deleted course
          setallcourses((prevCourses) =>
            prevCourses.filter((course) => course._id !== courseId)
          );
          console.log(`Course with ID ${courseId} deleted successfully.`);
        } else {
          console.error(`Failed to delete course with ID ${courseId}.`);
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // update course
  const updateCourse = async () => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app/Api/courses/updatecourse?courseId=${selectedCourseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            course_name,
            credit_hour,
            OpenForRegistration,
            desc,
            Prerequisites,
          }),
        }
      );

      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Course updated successfully",
          showConfirmButton: false,
          timer: 3500,
        });

        // Update the state with the modified course
        setallcourses((prevCourses) =>
          prevCourses.map((prevCourse) =>
            prevCourse._id === selectedCourseId
              ? {
                  ...prevCourse,
                  course_name,
                  credit_hour,
                  OpenForRegistration,
                  desc,
                  Prerequisites,
                }
              : prevCourse
          )
        );

        // Clear the selected course and reset input fields
        setSelectedCourseId(null);
        setcourse_name("");
        setdesc("");
        setOpenForRegistration("");
        setcredit_hour("");
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Course update failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  console.log(Prerequisites);
  return (
    <>
      <div className="Create_Student">
        <h2 className="create_student">Add Course</h2>
        <marquee className="marquee" scrollamount="10">
          {" "}
          It is not possible for more than one course to have the same name
          ,course code{" "}
        </marquee>
        <form className="row mt-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Course_Name"
              aria-label="course_name"
              name="course_name"
              value={course_name}
              onChange={(e) => {
                setcourse_name(e.target.value);
              }}
            />
            <Select
              isMulti
              name="colors"
              options={allcoursees.map((course) => {
                return { value: course._id, label: course.course_name };
              })}
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option.value
                );
                setPrerequisites(selectedValues);
              }}
              className="Materials_select"
              classNamePrefix="select"
            />

            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Description "
              aria-label="desc "
              name="desc"
              value={desc}
              onChange={(e) => {
                setdesc(e.target.value);
              }}
            />
          </div>
          <div className="col part2">
            <select
              className="form-control"
              aria-label="Course_hours"
              name="credit_hour"
              value={credit_hour}
              onChange={(e) => {
                setcredit_hour(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Course Hours
              </option>
              <option value="2">2 </option>
              <option value="3">3 </option>
            </select>
            <select
              className="form-control mt-3"
              aria-label="OpenForRegistration"
              name="OpenForRegistration"
              value={OpenForRegistration}
              onChange={(e) => {
                setOpenForRegistration(e.target.value);
              }}
            >
              <option value="" disabled>
                OpenForRegistration
              </option>
              <option value="true">True </option>
              <option value="false">False</option>
            </select>
          </div>
        </form>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={selectedCourseId ? updateCourse : createcourse}
        >
          {selectedCourseId ? "Update" : "Submit"}
        </button>
        <h2 className="col-12">All Courses Added</h2>
      </div>
      <div className="enrollcourse">
        {allcourses.map((course) => (
          <div className="course" key={course._id}>
            <div className="infooo">
              <p>{course.course_name}</p>
              <div className="up-del-btn">
                <button
                  style={{
                    backgroundColor: "#996ae4",
                    borderColor: "#996ae4",
                  }}
                  onClick={() => {
                    setSelectedCourseId(course._id);
                    // Set the values of the selected course to the input fields
                    setcourse_name(course.course_name);
                    setcredit_hour(course.credit_hour);
                    setOpenForRegistration(course.OpenForRegistration);
                    setdesc(course.desc);
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteCourse(course._id)}
                  type="button"
                  className="btn btn-danger delete_btn"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="img"></div>
          </div>
        ))}
      </div>
      {/* <button
        style={{
          width: "320px",
          height: "50px",
          border: "none",
          outline: "none",
          background: "#996ae4",
          borderRadius: "10px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          color: "white",
          marginLeft: "0rem",
          marginBottom: "20px",
          fontSize: "22px",
          marginLeft: "10px",
        }}
      >
        Loading More
      </button> */}
    </>
  );
}
export default CreateCourse;
