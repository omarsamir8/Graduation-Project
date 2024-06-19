import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { routes } from "../routes";
import defulatimg from "../assets/traing2jpeg.jpeg";
import TitleAnimation from "../Loader/TitleAnimation";
import { Link } from "react-router-dom";

export default function RegisterForCourse() {
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [allcoursesavailable, setallcoursesavailable] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all Courses
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.student._id}${routes.student.Availablecourses}`,
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
        if (response.ok) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  console.log(allcoursesavailable);
  // Register for course
  const RegisterForCourse = async (courseId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.courseRegister._id}${routes.courseRegister.addCourse}?courseId=${courseId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Course registered successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: data.error_Message
            ? data.error_Message[0].message
            : data.message,
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Register Failed", error);
    }
  };

  if (loading) {
    return <TitleAnimation />;
  }
  return (
    <>
      <div className="Create_Student">
        <h2>All Courses Available</h2>
      </div>
      <div className="enrollcourse">
        {allcoursesavailable.map((course) => (
          <div
            style={{ height: "auto", paddingBottom: "10px" }}
            className="course"
            key={course._id}
          >
            <p className="open-now">Open Now</p>{" "}
            {course && course.images && course.images.length > 0 ? (
              <img src={course.images[0].url} alt="" />
            ) : (
              <img src={defulatimg} alt="" />
            )}
            <div className="info">
              <h3>{course.course_name}</h3>
              <p style={{ maxHeight: "80px", overflow: "hidden" }}>
                {course.desc}
              </p>
              <p style={{ marginTop: "-25px", fontSize: "16px" }}>4 Months</p>
            </div>
            <div className="up-del-btn">
              <button
                type="button"
                style={{
                  backgroundColor: "#996ae4",
                  borderColor: "#996ae4",
                }}
                className="btn btn-primary"
                onClick={() => RegisterForCourse(course._id)}
              >
                Register Now
              </button>
              <button type="button" class="btn btn-secondary">
                <Link to={`/course/${course._id}`} className="link">
                  More Info
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
