import { Button } from "react-bootstrap";
import "./Registered_Courses.scss";
import Table from "react-bootstrap/Table";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import axios from "axios";
import { routes } from "../../routes";

export default function Registered_Courses() {
  const usenavigate = useNavigate();
  const NavigateToStudent = () => {
    usenavigate("/student");
  };
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [coursesregisterd, setcoursesregisterd] = useState([]);
  const [studentinfo, setStudentInfo] = useState([]);

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
        setStudentInfo(response.data.result);

        // Log the updated state
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  console.log(studentinfo);
  // get registerd courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.courseRegister._id}${routes.courseRegister.GetRegisterInfoByStudent}`,
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
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  return (
    <>
      <div className=" col-12 Registered_Courses">
        <img src="./assets/images/benha.png" className="Benha_img" />
        <div className="Title_registered col-4">
          <p className="col-12">
            Faculty of computers and artificial intelligence
          </p>
          <p className="col-12">Benha university</p>
          <p className="col-12">Student code :{studentinfo.Student_Code}</p>
          <p className="col-12">Student name :{studentinfo.Full_Name}</p>
          <p className="col-12">Level :{studentinfo.level}</p>
          {/* <p className="col-12">Semester :{studentinfo.semsterInfo.name}</p> */}
        </div>
        <img src="./assets/images/bfcai2.jpg" className="BFCAI_img" />

        <div style={{ marginTop: "120px" }} className="col-11 Table_courses">
          <div className="Line_div"></div>

          <Table striped bordered hover size="md" className="col-12">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Number Of Hours</th>
              </tr>
            </thead>
            <tbody>
              {coursesregisterd.map((courseregisterd, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{courseregisterd.course_name}</td>
                    <td>{courseregisterd.credit_hour}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        <div className="col-12 BackToStu">
          <Button className="BackToStuBtn" onClick={NavigateToStudent}>
            Back
          </Button>
          <Button className="Print_semester" onClick={window.print}>
            Print
          </Button>
        </div>
      </div>
    </>
  );
}
