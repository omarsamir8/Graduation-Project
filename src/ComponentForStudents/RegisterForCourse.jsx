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
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        // setallcoursesavailable(data.courses);
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
        <div className="course">
          <div className="info">
            <p>Object Oriented programming</p>
            <button type="button" class="btn btn-primary">
              Register
            </button>
          </div>
          <div className="img "></div>
        </div>
        <div className="course">
          <div className="info">
            <p>Basics Of Lang Programming</p>
            <button type="button" class="btn btn-primary">
              Register
            </button>
          </div>
          <div className="img img2"></div>
        </div>
        <div className="course">
          <div className="info">
            <p>Algorithms & Data Structure</p>
            <button type="button" class="btn btn-primary">
              Register
            </button>
          </div>
          <div className="img img3"></div>
        </div>
        <div className="course">
          <div className="info">
            <p>Opreating System</p>
            <button type="button" class="btn btn-primary">
              Register
            </button>
          </div>
          <div className="img img4"></div>
        </div>
        <div className="course">
          <div className="info">
            <p>E-Commerce & E-bussniss</p>
            <button type="button" class="btn btn-primary">
              Register
            </button>
          </div>
          <div className="img img5"></div>
        </div>
        <div className="course">
          <div className="info">
            <p>Data-----Mining</p>
            <button type="button" class="btn btn-primary">
              Register
            </button>
          </div>
          <div className="img img6"></div>
        </div>
      </div>
    </>
  );
}
