import React, { useEffect, useState } from "react";

export default function RegisterForCourse() {
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [allcoursesavailable, setallcoursesavailable] = useState([]);
  //  get all Courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app/Api/student/Availablecourses`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setallcoursesavailable(data.validCourses);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    console.log(allcoursesavailable);
  }, [allcoursesavailable]);
  return (
    <>
      <div className="Create_Student">
        <h2>All Courses Available</h2>
      </div>
      <div className="enrollcourse">
        {allcoursesavailable.map((course) => {
          return (
            <div className="course">
              <div className="info">
                <p>{course.course_name}</p>
                <button type="button" class="btn btn-primary">
                  Register
                </button>
              </div>
              <div className="img "></div>
            </div>
          );
        })}
      </div>
    </>
  );
}
