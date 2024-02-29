import React, { useEffect, useState } from "react";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
import Swal from "sweetalert2";

function CreateCourse() {
  const [course_name, setcourse_name] = useState("");
  const [Prerequisites, setPrerequisites] = useState("");
  const [credit_hour, setcredit_hour] = useState("");
  const [instructorId, setinstructorId] = useState("");
  const [OpenForRegistration, setOpenForRegistration] = useState("");
  const [desc, setdesc] = useState("");
  const [allcourses, setallcourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // create course
  const createcourse = async () => {
    try {
      const response = await fetch(
        "http://16.16.200.210:5000/Api/courses/addcourse",
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
          }),
        }
      );
      const data = await response.json();
      console.log(data);

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
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Course creation failed, please try again later",
          timer: 4500,
        });
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
          "http://16.16.200.210:5000/Api/courses/searchcourse?size=20",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = await response.json();
        setallcourses(data.course);
        console.log(data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    console.log(allcourses);
  }, [allcourses]);

  // delete course
  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(
        `http://16.16.200.210:5000/Api/courses/deletecourse?courseId=${courseId}`,
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
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // update course
  const updateCourse = async () => {
    try {
      const response = await fetch(
        `http://16.16.200.210:5000/Api/courses/updatecourse?courseId=${selectedCourseId}`,
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

  return (
    <>
      <div className="Create_Student">
        <h2 className="create_student">Add Course</h2>
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

            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Prerequisites"
              aria-label="Prerequisites"
              name="Prerequisites"
              value={Prerequisites}
              onChange={(e) => {
                setPrerequisites(e.target.value);
              }}
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
            <input
              type="email"
              className="form-control"
              placeholder="Enter Course_hours"
              aria-label="Course_hours"
              name="credit_hour"
              value={credit_hour}
              onChange={(e) => {
                setcredit_hour(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter instructorId "
              aria-label="instructorId "
              name="instructorId"
              value={instructorId}
              onChange={(e) => {
                setinstructorId(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter OpenForRegistration"
              aria-label="OpenForRegistration"
              name="OpenForRegistration "
              value={OpenForRegistration}
              onChange={(e) => {
                setOpenForRegistration(e.target.value);
              }}
            />
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
            <div className="info">
              <p>{course.course_name}</p>
              <div className="img"></div>
              <div className="up-del-btn">
                <button
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
          </div>
        ))}
      </div>
    </>
  );
}
export default CreateCourse;
