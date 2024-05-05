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
  const { StudentInfo } = useParams();

  const { allstudents, setallstudents } = useStudentContext();
  const [studentInfo, setStudentInfo] = useState([]);
  const [studentnewspaper, setstudentnewspaper] = useState([]);
  const [totalgpa, settotalgpa] = useState("");
  const [totalhour, settotalhour] = useState("");
  const [level, setlevel] = useState("");
  const [trainingsRegistered, setTrainingsRegistered] = useState([]);
  const [coursesregisterd, setcoursesregisterd] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // Dashboard for students
  useEffect(() => {
    const fetchSemesterGrade = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app/Api/students/Grades/Get/Newspaper/By/Admin?studentId=${studentId}
          `,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setstudentnewspaper(response.data.semesters);
        settotalgpa(response.data.totalGpaOverall);
        settotalhour(response.data.totalCreditHours);
        setlevel(response.data.level);
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchSemesterGrade();
  }, [accessToken, refreshToken]);
  console.log(studentnewspaper);

  // get total training registered
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.RegisterTraining._id}${routes.RegisterTraining.getTrainingRegisterdInfoTostu}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        const data = await response.json();
        setTrainingsRegistered(data.result.trainingRegisterd);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  console.log(trainingsRegistered);

  // get registerd courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.courseRegister._id}${routes.courseRegister.GetRegisterInfoByAdmin}?studentId=${StudentInfo._id}`,
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
        setcoursesregisterd(data.register.coursesRegisterd);
        console.log(coursesregisterd);
        console.log(studentInfo)
      
        
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken,StudentInfo]);

  return (
    <>
      <div className="studentInfoPage col-12">
        <div className="col-12 backgroundImg_info">
          <img src={Background} alt="Not found" className="studentInfo" />
          <div className="profile_info">
            <img src={profile_info} className="profile_photo" />
          </div>
          <div className="infoo">
            {studentnewspaper[0] && studentnewspaper[0].studentId && (
              <h4>
                {studentnewspaper[0].studentId.Full_Name
                  ? studentnewspaper[0].studentId.Full_Name
                  : "loading"}
              </h4>
            )}

            <h5 style={{ marginTop: "-5px" }}>Level : {level}</h5>
          </div>
        </div>
        <div className="single-details">
          <div className="det">
            <div className="single-det">
              <i class="fa-solid fa-signature"></i>
              {studentnewspaper[0] && studentnewspaper[0].studentId && (
                <h5>
                  {studentnewspaper[0].studentId.Full_Name
                    ? studentnewspaper[0].studentId.Full_Name
                    : "loading"}
                </h5>
              )}
            </div>
            <div className="single-det">
              <i class="fa-solid fa-code"></i>
              {studentnewspaper[0] && studentnewspaper[0].studentId && (
                <h5>
                  {studentnewspaper[0].studentId.Student_Code
                    ? studentnewspaper[0].studentId.Student_Code
                    : "loading"}
                </h5>
              )}
            </div>
            <div className="single-det">
              <i class="fa-solid fa-id-card"></i>
              {studentnewspaper[0] && studentnewspaper[0].studentId && (
                <h5>
                  {studentnewspaper[0].studentId.National_Id
                    ? studentnewspaper[0].studentId.National_Id
                    : "loading"}
                </h5>
              )}
            </div>
            <div className="single-det">
              <i class="fa-solid fa-phone"></i>
              {studentnewspaper[0] && studentnewspaper[0].studentId && (
                <h5>
                  {studentnewspaper[0].studentId.PhoneNumber
                    ? studentnewspaper[0].studentId.PhoneNumber
                    : "loading"}
                </h5>
              )}
            </div>
            <div className="single-det">
              <i class="fa-solid fa-cake-candles"></i>
              {studentnewspaper[0] && studentnewspaper[0].studentId && (
                <h5>
                  {new Date(
                    studentnewspaper[0].studentId.Date_of_Birth
                  ).toLocaleDateString()}
                </h5>
              )}
            </div>
          </div>
          <div className="det">
            <div className="single-det">
              <i class="fa-solid fa-layer-group"></i>
              <h5>
                {studentnewspaper[0] && studentnewspaper[0].semsterId && (
                  <h5>
                    {studentnewspaper[0].semsterId.term
                      ? studentnewspaper[0].semsterId.term
                      : "loading"}
                  </h5>
                )}
              </h5>
            </div>
            <div className="single-det">
              <i class="fa-solid fa-calendar-days"></i>
              {studentnewspaper[0] && studentnewspaper[0].semsterId && (
                <h5>
                  {studentnewspaper[0].semsterId.year
                    ? studentnewspaper[0].semsterId.year
                    : "loading"}
                </h5>
              )}
            </div>
            <div className="single-det">
              <i class="fa-solid fa-hourglass-start"></i>
              <h5>{totalhour ? totalhour : "loading"}</h5>
            </div>
            <div className="single-det">
              <i class="fa-brands fa-google"></i>
              <h5>{totalgpa ? totalgpa : "loading"}</h5>
            </div>
            <div className="single-det">
              <i class="fa-solid fa-venus-mars"></i>
              {studentnewspaper[0] && studentnewspaper[0].studentId && (
                <h5>
                  {studentnewspaper[0].studentId.gender
                    ? studentnewspaper[0].studentId.gender
                    : "loading"}
                </h5>
              )}
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
                <tr>
                  <td>{1}</td>
                  <td>Discrete Mathimatic</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>{1}</td>
                  <td>Discrete Mathimatic</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>{1}</td>
                  <td>Discrete Mathimatic</td>
                  <td>3</td>
                </tr>
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
