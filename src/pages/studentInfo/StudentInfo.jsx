import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Background from "../../../src/assets/55.jpg";
import profile_info from "../../../src/poster1.jpg";
import "./StudentInfo.scss";
import { useStudentContext } from "../../StudentContext";
import axios from "axios";
import { routes } from "../../routes";
import { Button, Table } from "react-bootstrap";

export default function StudentInfo() {
  const { studentId } = useParams();

  let [studentData, setstudentData] = useState({});

  const [trainingsRegistered, setTrainingsRegistered] = useState([]);
  const [coursesregisterd, setcoursesregisterd] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // get student information
  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app/Api/students/get/information/by/admin?studentId=${studentId}
          `,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setstudentData(response.data.result);
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchStudentInfo();
  }, [accessToken, refreshToken]);
  console.log(studentData);

  // get courses an training registerd
  useEffect(() => {
    const fetchStudentcCursesAndTraining = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app/Api/students/registers/get/Register/info/by/admin?studentId=${studentId}
          `,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setcoursesregisterd(response.data.register.coursesRegisterd);
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchStudentcCursesAndTraining();
  }, [accessToken, refreshToken]);
  console.log(coursesregisterd);
  return (
    <>
      <div className="studentInfoPage col-12">
        <div className="col-12 backgroundImg_info">
          <img src={Background} alt="Not found" className="studentInfo" />
          <div className="profile_info">
            <img
              src={studentData.url ? studentData.url : profile_info}
              className="profile_photo"
              alt=""
            />
          </div>
          <div className="infoo">
            <h4>{studentData.Full_Name}</h4>

            <h5 style={{ marginTop: "-5px" }}>Level : {studentData.level}</h5>
          </div>
        </div>
        <div className="single-details">
          <div className="det">
            <div className="single-det col-12">
              {/* <i class="fa-solid fa-signature"></i> */}
              <h5>
                Name : <span>{studentData.Full_Name}</span>
              </h5>
            </div>
            <div className="single-det">
              <h5>
                Student Code : <span>{studentData.Student_Code}</span>
              </h5>
            </div>
            <div className="single-det">
              <h5>
                National ID :<span>{studentData.National_Id}</span>{" "}
              </h5>
            </div>
            <div className="single-det">
              <h5>
                Phone Number : <span>{studentData.PhoneNumber}</span>
              </h5>
            </div>
            <div className="single-det">
              <h5>
                Birth Date :{" "}
                <span>
                  {" "}
                  {new Date(studentData.Date_of_Birth).toLocaleDateString()}
                </span>
              </h5>
            </div>
          </div>
          <div className="det">
            <div className="single-det">
              <h5>
                Term :{" "}
                <span>
                  {" "}
                  {studentData.semsterInfo
                    ? studentData.semsterInfo.term
                    : null}
                </span>
              </h5>
            </div>
            <div className="single-det">
              <h5>
                Academic Year :
                <span>
                  {" "}
                  {studentData.semsterInfo
                    ? studentData.semsterInfo.year
                    : null}{" "}
                </span>
              </h5>
            </div>
            <div className="single-det">
              <h5>
                Total Hours : <span>{studentData.totalCreditHours}</span>
              </h5>
            </div>
            <div className="single-det">
              <h5>
                Total GPA :<span> {studentData.TotalGpa}</span>
              </h5>
            </div>
            <div className="single-det">
              <h5>
                Gender : <span>{studentData.gender}</span>
              </h5>
            </div>
          </div>
          <div className="det">
            <h4>Registerd Course</h4>
            <Table striped bordered hover size="md" className="col-12">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Course Name</th>
                  <th>Number Of Hours</th>
                </tr>
              </thead>
              <tbody>
                {coursesregisterd.map((course, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{course.course_name}</td>
                      <td>{course.credit_hour}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className="det">
            <h4>Registerd Training</h4>
            <Table striped bordered hover size="md" className="col-12">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Training Name</th>
                  <th>Number Of Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{1}</td>
                  <td>React (JS) </td>
                  <td>60</td>
                </tr>
                <tr>
                  <td>{1}</td>
                  <td>Anguler (JS)</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>{1}</td>
                  <td>Data Analysis</td>
                  <td>40</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
