import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

// import "./traininginfo.css";

const CourseInfo = () => {
  const { courseId } = useParams(); // Get training ID from URL parameter
  const [CourseData, setCourseData] = useState([]);
  const [courseImages, setcourseImages] = useState([]);

  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // Fetch training Info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app/Api/courses/Get/single/course/info/by/student?courseId=${courseId}`,
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
        setCourseData(data.course);
        setcourseImages(data.course.images);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [courseId, accessToken, refreshToken]);

  return (
    <>
      <h3
        style={{
          textAlign: "center",
          marginTop: "10px",
          fontWeight: "bold",
          fontFamily: "cursive",
        }}
      >
        Course Details
      </h3>
      <div
        style={{
          margin: "auto",
          height: "2px",
          width: "120px",
          backgroundColor: "black",
        }}
      ></div>
      <div style={{ marginTop: "20px" }} className="productdisplay">
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            {courseImages.map((img, index) => {
              if (courseImages[index] && courseImages[index].url) {
                return <img key={index} src={courseImages[index].url} alt="" />;
              } else {
                return null;
              }
            })}
            {courseImages.length > 0 && (
              <img src={courseImages[0].url} alt="" />
            )}
          </div>
          <div className="productdisplay-img">
            {courseImages.length > 0 && (
              <img
                style={{ height: "460px" }}
                className="productdisplay-main-img"
                src={courseImages[0].url}
                alt=""
              />
            )}
          </div>
        </div>
        <div className="productdisplay-right">
          <h1>{CourseData.course_name}</h1>
          <div
            style={{
              width: "100%",
              overflow: "hidden",
              overflowY: "scroll",
              scroll: "smooth",
              height: "17rem",
            }}
            className="productdisplay-right-descriptions"
          >
            {CourseData.desc}
          </div>
          <p
            style={{ marginTop: "15px" }}
            className="productdisplay-right-category"
          >
            <span>Open For Register :</span> {CourseData.OpenForRegister} True
          </p>
          <p className="productdisplay-right-category">
            <span>Credit Hour :</span> {CourseData.credit_hour}
          </p>
          {/* <p className="productdisplay-right-category">
            <span>End Date:</span>{" "}
            {new Date(CourseData.end_date).toLocaleDateString()}
          </p> */}
          <p className="productdisplay-right-category">
            <Link to="/student" style={{ cursor: "pointer", color: "#b893dd" }}>
              Back~~~~
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default CourseInfo;
