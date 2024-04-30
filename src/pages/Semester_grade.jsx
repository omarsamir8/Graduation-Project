import { Button, Table } from "react-bootstrap";
import Report from "../ComponentForStudents/Report";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { routes } from "../routes";
export default function Semester_grade() {
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [studentGrades, setstudentGrades] = useState([]);
  const [HoursInSemster, setHoursInSemster] = useState("");
  const usenavigate = useNavigate();
  const NavigateToStudent = () => {
    usenavigate("/student");
  };

  const [studentinfo, setstudentinfo] = useState([]);
  const [Semesterinfo, setSemesterinfo] = useState([]);
  const [GpaInSemster, setGpaInSemster] = useState("");
  // get user info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.student._id}${routes.student.getInfo}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setstudentinfo(response.data.result);

        // Log the updated state
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  console.log(Semesterinfo);

  //   Fetch Semester Grade
  // get user info
  useEffect(() => {
    const fetchSemesterGrade = async () => {
      try {
        const response = await axios.get(
          "https://university-mohamed.vercel.app/Api/students/Grades/Get/Main/semster/Grade/for/student",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setstudentGrades(response.data.result.courseGrates);
        setSemesterinfo(response.data.result.semsterId);
        setGpaInSemster(response.data.result.GpaInSemster);
        setHoursInSemster(response.data.result.HoursInSemster);
        // Log the updated state
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchSemesterGrade();
  }, [accessToken, refreshToken]);
  console.log(GpaInSemster);
  return (
    <div className=" col-12 Registered_Courses">
      <img src="./assets/images/benha.png" className="Benha_img" />
      <div className="Title_registered col-4">
        <p className="col-12 pp">
          Faculty of computers and artificial intelligence
        </p>
        <p className="col-12 ">Benha university</p>
        <p className="col-12">Student code :{studentinfo.Student_Code}</p>
        <p className="col-12">Student name :{studentinfo.Full_Name}</p>
        <p className="col-12">Level :{studentinfo.level}</p>
        {/* <p className="col-12">Semester :{studentinfo.semsterInfo.name}</p> */}
      </div>
      <img src="./assets/images/bfcai2.jpg" className="BFCAI_img" />

      <div className="col-11 Table_courses">
        <div className="col-12">
          <div className="Line_div_report" />
          <div className="col-12">
            <Table
              striped
              bordered
              hover
              size="md"
              className=" Head_table col-12"
            >
              <th className="col-12 Title_table">
                <p> Level: {studentinfo.level}</p>
                <p>Academic year:{Semesterinfo.name} </p>
                <p>Total level number of hours:{HoursInSemster} </p>
                <p>Total level gpa:{GpaInSemster}</p>
              </th>
            </Table>
            <Table
              striped
              bordered
              hover
              size="md"
              className=" Head_table_2 col-12"
            >
              <th className="col-12 Title_table_2">
                <p>Semester Name :{Semesterinfo.name} </p>
              </th>
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
                {studentGrades.map((studentgrade, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{studentGrades[index].courseId.course_name}</td>
                      <td>{studentGrades[index].courseId.credit_hour}</td>
                      <td>{studentGrades[index].TotalGrate}</td>
                      <td>{studentGrades[index].Grade}</td>
                      <td>{studentGrades[index].Points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
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
  );
}
