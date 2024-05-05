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

  const { semesterinfo, setsemesterinfo } = useState([]);
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
          `https://university-mohamed.vercel.app${routes.studentGrades._id}${routes.studentGrades.NewspaperBystudent}`,
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
        setStudentInfo(response.data.semesters[0].studentId);
        setsemesterinfo(response.data.semesters[0].semsterId);

        // Log the updated state
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchSemesterGrade();
  }, [accessToken, refreshToken]);
  console.log(studentnewspaper);

  return (
    <>
      <div className="studentInfoPage col-12">
        <div className="col-12 backgroundImg_info">
          <img src={Background} alt="Not found" className="studentInfo" />
          <div className="profile_info">
            <img src={profile_info} className="profile_photo" />
          </div>
          <div className="infoo">
            <h4>
              {studentInfo.FullName ? studentInfo.FullName : "Omar Samir"}{" "}
            </h4>
            <h5 style={{ marginTop: "-5px" }}>Level : One</h5>
          </div>
        </div>
        <div className="single-details">
          <div className="det">
            <div className="single-det">
              <i class="fa-solid fa-signature"></i>
              <h5>
                {studentInfo.FullName ? studentInfo.FullName : "Omar Samir"}{" "}
              </h5>
            </div>
            <div className="single-det">
              <i class="fa-solid fa-code"></i>
              <h5>266120200100849</h5>
            </div>
            <div className="single-det">
              <i class="fa-solid fa-id-card"></i>
              <h5>30207271400258</h5>
            </div>
            <div className="single-det">
              <i class="fa-solid fa-phone"></i>
              <h5>01558849371 </h5>
            </div>
            <div className="single-det">
              <i class="fa-solid fa-cake-candles"></i>
              <h5>27/7/2002 </h5>
            </div>
          </div>
          <div className="det">
            <div className="single-det">
              <i class="fa-solid fa-layer-group"></i>
              <h5>{level ? level : "One"}</h5>
            </div>
            <div className="single-det">
              <i class="fa-solid fa-calendar-days"></i>
              <h5>2024-2025</h5>
            </div>
            <div className="single-det">
              <i class="fa-solid fa-hourglass-start"></i>
              <h5>{totalhour ? totalhour : "12"}</h5>
            </div>
            <div className="single-det">
              <i class="fa-brands fa-google"></i>
              <h5>{totalgpa ? totalgpa : "3.5"}</h5>
            </div>
            <div className="single-det">
              <i class="fa-solid fa-venus-mars"></i>
              <h5>Male</h5>
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
