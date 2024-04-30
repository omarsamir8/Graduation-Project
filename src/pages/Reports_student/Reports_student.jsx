import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import "./Reports_student.scss";
import Report from "../../ComponentForStudents/Report";
import axios from "axios";
import { routes } from "../../routes";

export default function Reports_student() {
  const usenavigate = useNavigate();
  const NavigateToStudent = () => {
    usenavigate("/student");
  };
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [studentnewspaper, setstudentnewspaper] = useState([]);
  const [totalgpa, settotalgpa] = useState("");
  const [totalhour, settotalhour] = useState("");
  const [level, setlevel] = useState("");
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

        // Log the updated state
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchSemesterGrade();
  }, [accessToken, refreshToken]);
  console.log(studentnewspaper);
  return (
    <div className=" col-12 Registered_Courses">
      <img src="./assets/images/benha.png" className="Benha_img" />

      <div className="Title_registered col-4">
        <p className="col-12 pp">
          Faculty of computers and artificial intelligence
        </p>
        <p className="col-12 pp">Benha university</p>
        <p className="col-12">
          Student code :
          {studentnewspaper.length > 0
            ? studentnewspaper[0].studentId.National_Id
            : ""}
        </p>
        <p className="col-12">
          Student name :
          {studentnewspaper.length > 0
            ? studentnewspaper[0].studentId.Full_Name
            : ""}
        </p>
        <p className="col-12 ">Level : {level}</p>
        <p className="col-12 ">
          Semester :
          {studentnewspaper.length > 0
            ? studentnewspaper[0].semsterId.term
            : ""}
        </p>
        <p className="col-12 ">
          {studentnewspaper.length > 0
            ? studentnewspaper[0].semsterId.year
            : ""}
        </p>
      </div>
      <img src="./assets/images/bfcai2.jpg" className="BFCAI_img" />

      <div className="col-11 Table_courses">
        <div className="col-12">
          <div className="Line_div_report" />
          <div>
            <Table
              striped
              bordered
              hover
              size="sm"
              className=" Head_table col-12 "
            >
              <th className="col-12 Title_table">
                <p> Level: {level}</p>
                <p>
                  Academic Year:
                  {studentnewspaper.length > 0
                    ? studentnewspaper[0].semsterId.year
                    : ""}
                </p>
                <p>
                  Total Hours:
                  {totalhour}
                </p>
                <p>Total GPA:{totalgpa}</p>
              </th>
            </Table>
          </div>
          {studentnewspaper.map((sem, index) => (
            <div className="col-12" key={index}>
              <div>
                <Table
                  striped
                  bordered
                  hover
                  size="sm"
                  className=" Head_table_2 col-12"
                >
                  <thead>
                    <tr>
                      <th className="col-12 Title_table_2">
                        <p>
                          Semester Name: {sem.semsterId.term}{" "}
                          {sem.semsterId.year}
                        </p>
                      </th>
                    </tr>
                  </thead>
                </Table>
                <Table striped bordered hover size="sm" className="col-12">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Course Name</th>
                      <th>Number Of Hours</th>
                      <th>Grade</th>
                      <th>Course grade</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sem.courseGrates.map((course, courseIndex) => (
                      <tr key={courseIndex}>
                        <td>{courseIndex + 1}</td>
                        <td>{course.courseId.course_name}</td>
                        <td>{course.courseId.credit_hour}</td>
                        <td>{course.TotalGrate}</td>
                        <td>{course.Grade}</td>
                        <td>{course.Points}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          ))}
        </div>

        <div className="col-12 BackToStu_report">
          <Button className="BackToStuBtn" onClick={NavigateToStudent}>
            Back
          </Button>
          <Button className="Print_semester" onClick={window.print}>
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}
