import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { routes } from "../routes";

export default function RegisterForCourse() {
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [allcoursesavailable, setallcoursesavailable] = useState([]);

  // Fetch all Courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.student._id}${routes.student.Availablecourses}&page=1&size=10`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        const data = await response.json();
        setallcoursesavailable(data.validCourses);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  // Register for course
  const RegisterForCourse = async (courseId) => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app/Api/student/register/addCourse?courseId=${courseId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Course registered successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Course register failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Register Failed", error);
    }
  };

  return (
    <>
      <div className="Create_Student">
        <h2>All Courses Available</h2>
      </div>
      <div className="enrollcourse">
        {allcoursesavailable.map((course) => (
          <div className="course" key={course._id}>
            <div className="info">
              <p>{course.course_name}</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => RegisterForCourse(course._id)}
              >
                Register
              </button>
            </div>
            <div className="img "></div>
          </div>
        ))}
      </div>
    </>
  );
}
