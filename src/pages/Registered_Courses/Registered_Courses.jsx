import { Button } from "react-bootstrap";
import "./Registered_Courses.scss";
import Table from "react-bootstrap/Table";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import axios from "axios";
import { routes } from "../../routes";
import Swal from "sweetalert2";

export default function Registered_Courses() {
  const usenavigate = useNavigate();
  const NavigateToStudent = () => {
    usenavigate("/student");
  };
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [coursesregistered, setCoursesRegistered] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);

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
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

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
        setCoursesRegistered(data.register.coursesRegisterd);
        console.log(coursesregistered);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  // delete course from registered courses
  const deleteRegisteredCourse = async (courseId) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.courseRegister._id}${routes.courseRegister.deleteCourse}?courseId=${courseId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        if (response.ok) {
          // On success, update the state to remove the deleted course
          setCoursesRegistered((prevCourses) =>
            prevCourses.filter((course) => course._id !== courseId)
          );
          console.log(`Course with ID ${courseId} deleted successfully.`);
        } else {
          const errorData = await response.json();
          console.error(`Failed to delete this course: ${errorData.message}`);
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <>
      <div className="col-12 Registered_Courses">
        <img src="./assets/images/benha.png" className="Benha_img" />
        <div className="Title_registered col-4">
          <p className="col-12 pp">
            Faculty of computers and artificial intelligence
          </p>
          <p className="col-12">Benha university</p>
          <p className="col-12">Student code: {studentInfo.Student_Code}</p>
          <p className="col-12">Student name: {studentInfo.Full_Name}</p>
          <p className="col-12">Level: {studentInfo.level}</p>
        </div>
        <img src="./assets/images/bfcai2.jpg" className="BFCAI_img" />

        <div style={{ marginTop: "140px" }} className="col-11 Table_courses">
          <Table striped bordered hover size="md" className="col-12">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Number Of Hours</th>
                <th className="DeleteAction">Action</th>
              </tr>
            </thead>
            <tbody>
              {coursesregistered.map((course, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{course.course_name}</td>
                  <td>{course.credit_hour}</td>
                  <td>
                    <div className="DeleteRegisteredCourse">
                      <Button
                        variant="danger"
                        onClick={() => deleteRegisteredCourse(course._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div style={{ marginTop: "50px" }} className="col-12 BackToStu">
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
