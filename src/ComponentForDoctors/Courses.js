import { Link, NavLink, useParams } from "react-router-dom";
import { $Dashboard2_Components } from "../Atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { routes } from "../routes";
import { Button, Table } from "react-bootstrap";
import defulatimg from "../assets/traing2jpeg.jpeg";
import "../Styles_For_Admin/category.css";
import TitleAnimation from "../Loader/TitleAnimation";
function Courses() {
  const [selectedComponent2, setSelectedComponent2] = useRecoilState(
    $Dashboard2_Components
  );
  const [allstudentregistercourses, setallstudentregistercourses] = useState(
    []
  );

  const [doctorMatarials, setdoctorMatarials] = useState([]);
  const [Midterm, setMidterm] = useState("");
  const [courseId, setcourseId] = useState("");
  const [semsterId, setsemsterId] = useState("");
  const [studentId, setstudentId] = useState("");
  const [FinalExam, setFinalExam] = useState("");
  const [Oral, setOral] = useState("");
  const [backToRegister, setbackToRegister] = useState("yes");
  const [Practical, setPractical] = useState("");
  const [mainsemester, setmainsemester] = useState([]);
  const [courseGradesInstruc, setcourseGradesInstruc] = useState([]);
  const [selectedGradeId, setselectedGradeId] = useState("");
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [loading, setLoading] = useState(false);
  // Function to get students registered in a course
  const fetchRegisteredStudents = async (courseId) => {
    setLoading(true);
    console.log(courseId);
    try {
      const response = await axios.get(
        `https://university-mohamed.vercel.app${routes.courseRegister._id}${routes.courseRegister.searchRegisterByInstructor}?courseId=${courseId}&page=1&size=10&select=studentId,coursesRegisterd`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(courseId);
      console.log(response.data);
      setallstudentregistercourses(response.data.registers);
      if (response.ok) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching registered students:", error);
    }
  };
  console.log(allstudentregistercourses);

  // get doctor materials
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.instructor._id}${routes.instructor.InstructorInfo}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setdoctorMatarials(response.data.user.Materials);
        if (response.ok) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  console.log(doctorMatarials);
  // get semster information

  useEffect(() => {
    const fetchDataa = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.semster._id}${routes.semster.MainSemsterInfoByInstructor}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setmainsemester(response.data.semster);
        if (response.ok) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchDataa();
  }, [accessToken, refreshToken]);

  // Upload grades for students
  const Upload_grade = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.studentGrades._id}${routes.studentGrades.AddGradeByInstructor}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            courseId,
            // semsterId,
            studentId,
            Midterm,
            Oral,
            Practical,
            FinalExam,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      // setmessage(data.message);
      if (response.ok) {
        // Show SweetAlert on success
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Upload grade successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        setLoading(false);
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Upload grade failed please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Upload grade failed", error);
    }
  };
  // get result For Student

  const fetchDataaa = async (courseId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://university-mohamed.vercel.app/Api/students/Grades/search/by/instructor?courseId=${courseId}&size=7&page=1&select=studentId,courseId,Points,Grade,FinalExam,Oral,Practical,Midterm,YearWorks,semsterId,TotalGrate`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response.data);
      setcourseGradesInstruc(response.data.grades);
      if (response.ok) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching doctor info:", error);
    }
  };

  // update grade
  const updateGrade = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app/Api/students/Grades/update/grade/by/instructor?GradeId=${selectedGradeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            // studentId,
            // courseId,
            Oral,
            Practical,
            Midterm,
            FinalExam,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Grade updated successfully",
          showConfirmButton: false,
          timer: 3500,
        });

        // Update the state with the modified course
        setcourseGradesInstruc((prevGrades) =>
          prevGrades.map((prevGrade) =>
            prevGrade._id === selectedGradeId
              ? {
                  ...prevGrade,
                  // studentId,
                  // courseId,
                  Midterm,
                  Oral,
                  Practical,
                  FinalExam,
                }
              : prevGrade
          )
        );

        // Clear the selected course and reset input fields
        setselectedGradeId(null);
        setstudentId("");
        setcourseId("");
        setOral("");
        setMidterm("");
        setPractical("");
        setFinalExam("");
      } else {
        setLoading(false);
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: data.error_Message[0].message,
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  // delete course
  const deleteGrade = async (GradeId) => {
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
        setLoading(true);
        const response = await fetch(
          `https://university-mohamed.vercel.app/Api/student/Grades/deletecoursegrate?GradeId=${GradeId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
            body: JSON.stringify({
              backToRegister,
            }),
          }
        );

        if (response.ok) {
          setLoading(false);
          // On success, update the state to remove the deleted course
          setcourseGradesInstruc((prevGrade) =>
            prevGrade.filter((grade) => grade._id !== GradeId)
          );
          console.log(`Course with ID ${courseId} deleted successfully.`);
          Swal.fire({
            icon: "success",
            title: "Fail",
            text: "Course Grade Deleted Successfully",
            timer: 4500,
          });
        } else {
          setLoading(false);
          console.error(`Failed to delete course with ID ${GradeId}.`);
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: "Course Grade Deleted Failed",
            timer: 4500,
          });
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  if (loading) {
    return <TitleAnimation />;
  }
  return (
    <>
      <div style={{ width: "1020px" }} className="enrollcourse">
        {doctorMatarials.map((material) => {
          return (
            <div
              style={{ height: "400px" }}
              className="course"
              key={material._id}
            >
              <p className="open-now">Open Now</p>{" "}
              {material && material.images && material.images.length > 0 ? (
                <img src={material.images[0].url} alt="" />
              ) : (
                <img src={defulatimg} alt="" />
              )}
              <div className="info">
                <h3>{material.course_name}</h3>
              </div>
              <div className="up-del-btn">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    fetchRegisteredStudents(material._id);
                  }}
                >
                  Students Register Course
                </button>
                <button
                  style={{ backgroundColor: "gray", borderColor: "gray" }}
                  type="button"
                  className="btn btn-primary"
                >
                  <Link to={`/material/${material._id}`} className="link">
                    Report For Student Result
                  </Link>
                </button>
                <button
                  style={{
                    backgroundColor: "#996ae4",
                    borderColor: "#996ae4",
                    marginBottom: "5px",
                  }}
                  onClick={() => {
                    fetchDataaa(material._id);
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  Update Student Grade
                </button>
                {/* <button type="button" class="btn btn-secondary">
                  <Link to={`/course/${material._id}`} className="link">
                    More Info
                  </Link>
                </button> */}
              </div>
            </div>
          );
        })}
      </div>
      <h4
        className="update"
        style={{ marginLeft: "10px", marginTop: "10px", fontWeight: "bold" }}
      >
        {selectedGradeId ? "Update Grade" : "Upload Grade"}
      </h4>
      <div
        style={{
          marginTop: "20px",
          height: "70px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "10px",
        }}
        className="addcategory category-search animate__animated animate__fadeInDown uploadgrade"
      >
        <input
          style={{ width: "30%", marginLeft: "10px", height: "40px" }}
          className="form-control form-control-sm"
          type="text"
          name="courseId"
          value={courseId}
          onChange={(e) => {
            setcourseId(e.target.value);
          }}
          placeholder="Course ID"
          aria-label=".form-control-sm example"
        />

        <input
          style={{ width: "30%", marginLeft: "10px", height: "40px" }}
          className="form-control form-control-sm"
          type="text"
          name="studentId"
          value={studentId}
          onChange={(e) => {
            setstudentId(e.target.value);
          }}
          placeholder="Student ID"
          aria-label=".form-control-sm example"
        />
        <input
          style={{ width: "30%", marginLeft: "10px", height: "40px" }}
          className="form-control form-control-sm"
          type="number"
          name="FinalExam"
          value={FinalExam}
          onChange={(e) => {
            setFinalExam(e.target.value);
          }}
          placeholder="Final Exam "
          aria-label=".form-control-sm example"
        />

        <input
          style={{ width: "30%", marginLeft: ".6rem", height: "40px" }}
          className="form-control form-control-sm"
          type="number"
          name="Oral"
          value={Oral}
          onChange={(e) => {
            setOral(e.target.value);
          }}
          placeholder="Oral"
          aria-label=".form-control-sm example"
        />
        <input
          style={{ width: "30%", marginLeft: "10px", height: "40px" }}
          className="form-control form-control-sm"
          type="number"
          name="Practical"
          value={Practical}
          onChange={(e) => {
            setPractical(e.target.value);
          }}
          placeholder="Practical"
          aria-label=".form-control-sm example"
        />
        <input
          style={{ width: "30%", marginLeft: "10px", height: "40px" }}
          className="form-control form-control-sm"
          type="number"
          name="Midterm"
          value={Midterm}
          onChange={(e) => {
            setMidterm(e.target.value);
          }}
          placeholder="Midterm"
          aria-label=".form-control-sm example"
        />
        <button
          style={{
            width: "305px",
            height: "40px",
            marginLeft: ".6rem",
            backgroundColor: "#996ae4",
            color: "white",
          }}
          onClick={selectedGradeId ? updateGrade : Upload_grade}
          type="button"
          className="btn "
        >
          {selectedGradeId ? "Update Grade" : "Upload Grade"}
        </button>
      </div>
      {allstudentregistercourses.length > 0 && (
        <div
          style={{ marginTop: "7rem", marginLeft: "10px" }}
          className="get_all_student"
        >
          <h3 className="table2">All Student Reg Course</h3>

          <>
            <Table
              striped
              bordered
              hover
              size="sm"
              style={{ textAlign: "center" }}
              class="table2"
            >
              <thead>
                <tr>
                  <th scope="col">#ID</th>
                  <th scope="col">FullName</th>
                  <th scope="col">Student_code</th>
                  <th scope="col">National_Id</th>
                  <th scope="col">Department</th>
                  <th scope="col">CourseName</th>
                  <th scope="col">Submit</th>
                </tr>
              </thead>
              <tbody>
                {allstudentregistercourses.map((student, index) => {
                  return (
                    <tr key={index + 1}>
                      <th scope="row">{index + 1}</th>
                      <td>{student.studentId?.Full_Name}</td>
                      <td>{student.studentId?.Student_Code}</td>
                      <td>{student.studentId?.National_Id}</td>
                      <td>
                        {student.studentId?.department || "No Department"}
                      </td>
                      <td>{student.coursesRegisterd[0]?.course_name}</td>

                      <td>
                        <Button
                          type="submit"
                          style={{
                            height: "35px",
                            border: "none",
                            borderRadius: "5px",
                            backgroundColor: "#996ae4",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          onClick={() => {
                            setsemsterId(mainsemester._id);
                            setstudentId(student.studentId._id);
                            setcourseId(student.coursesRegisterd[0]._id);
                          }}
                        >
                          Upload
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        </div>
      )}

      {courseGradesInstruc.length > 0 && (
        <div style={{ marginTop: "0px", marginLeft: "10px" }}>
          <hr style={{ marginTop: "80px" }} />
          <h3 style={{ marginLeft: "0px" }} className="table3">
            Student Result To Update{" "}
          </h3>
          <Table
            style={{ marginLeft: "0px", textAlign: "center" }}
            striped
            bordered
            hover
            size="md"
            className="col-12 table3"
          >
            <thead>
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Student Name</th>
                <th scope="col">Course Name</th>
                <th scope="col">YearWorks</th>
                <th scope="col">Practical</th>
                <th scope="col">FinalExam</th>
                <th scope="col">TotalGrate</th>
                <th scope="col">Operation</th>
              </tr>
            </thead>
            <tbody>
              {courseGradesInstruc.map((results, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{results.studentId.Full_Name}</td>
                    <td>{results.courseId.course_name}</td>
                    <td>{results.YearWorks}</td>
                    <td>{results.Practical}</td>
                    <td>{results.FinalExam}</td>
                    <td>{results.TotalGrate}</td>
                    <td>
                      <button
                        style={{
                          width: "80px",
                          height: "40px",
                          marginLeft: ".6rem",
                          backgroundColor: "#996ae4",
                          color: "white",
                        }}
                        onClick={() => {
                          setcourseId(results.courseId._id);
                          setstudentId(results.studentId._id);
                          setMidterm(results.Midterm);
                          setOral(results.Oral);
                          setPractical(results.Practical);
                          setFinalExam(results.FinalExam);
                          setselectedGradeId(results._id);
                        }}
                        type="button"
                        className="btn "
                      >
                        Update
                      </button>
                      <button
                        style={{
                          width: "80px",
                          height: "40px",
                          marginLeft: ".6rem",
                          backgroundColor: "red",
                          color: "white",
                        }}
                        onClick={() => {
                          deleteGrade(results._id);
                        }}
                        type="button"
                        className="btn "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default Courses;
