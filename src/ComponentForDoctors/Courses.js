import { NavLink } from "react-router-dom";
import { $Dashboard2_Components } from "../Atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
  const [Practical, setPractical] = useState("");
  const [mainsemester, setmainsemester] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // Function to get students registered in a course
  const fetchRegisteredStudents = async (courseId) => {
    console.log(courseId);
    try {
      const response = await axios.get(
        `https://university-mohamed.vercel.app/Api/student/register/searchRegister?select=studentId,coursesRegisterd&size=20&courseId=${courseId}`,
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
    } catch (error) {
      console.error("Error fetching registered students:", error);
    }
  };
  console.log(allstudentregistercourses);

  // get doctor materials
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://university-mohamed.vercel.app/Api/instructor/getinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setdoctorMatarials(response.data.user.Materials);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  // get semster information
  useEffect(() => {
    const fetchDataa = async () => {
      try {
        const response = await axios.get(
          "https://university-mohamed.vercel.app/Api/semster/MainSemsterInfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setmainsemester(response.data.semster);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchDataa();
  }, [accessToken, refreshToken]);

  // Upload grades for students
  const Upload_grade = async () => {
    try {
      const response = await fetch(
        "https://university-mohamed.vercel.app/Api/student/Grades/addgrate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            courseId,
            semsterId,
            studentId,
            Midterm,
            Oral,
            Practical,
            FinalExam
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      // setmessage(data.message);
      if (response.ok) {
        // Show SweetAlert on success

        Swal.fire({
          icon: "success",
          title: "Upload grade successfully",
          showConfirmButton: false,
          timer: 3500,
        });

  ;
      } else {
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
  return (
    <>
      <div className="enrollcourse">
        {doctorMatarials.map((material) => {
          return (
            <div className="course" key={material._id}>
              <div className="info">
                <p>{material.course_name}</p>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => fetchRegisteredStudents(material._id)}
                >
                  Students
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <h4 style={{ marginLeft: "10px", marginTop: "10px", fontWeight: "bold" }}>
        Upload Grade{" "}
      </h4>
      <div
        style={{
          marginTop: "20px",
          height: "70px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
        className="addcategory category-search animate__animated animate__fadeInDown"
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
          name="semsterId"
          value={semsterId}
          onChange={(e) => {
            setsemsterId(e.target.value);
          }}
          placeholder="Semster ID"
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
            width: "280px",
            height: "40px",
            marginLeft: ".6rem",
            backgroundColor: "#996ae4",
            color: "white",
          }}
         onClick={Upload_grade}
          type="button"
          className="btn "
        >
      
          Upload Grade
        </button>
      </div>
      <div style={{ marginTop: "5rem" }} className="get_all_student">
        <h2 style={{ marginLeft: "6rem" }}> All Students Reg Course </h2>
        <table style={{ textAlign: "center" }} class="table">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">FullName</th>
              <th scope="col">Student_code</th>
              <th scope="col">National_Id</th>
              <th scope="col">Department</th>
              <th scope="col">CourseName</th>
              <th scope="col">Course_Grade</th>
              <th scope="col">Submit</th>
            </tr>
          </thead>
          <tbody>
            {allstudentregistercourses.map((student, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{student.studentId.Full_Name}</td>
                  <td>{student.studentId.Student_Code}</td>
                  <td>{student.studentId.National_Id}</td>
                  <td>{student.studentId.department}</td>
                  <td>{student.coursesRegisterd[0].course_name}</td>

                  <td>
                    {" "}
                    <input
                      style={{
                        width: "150px",
                        alignItems: "center",
                        height: "25px",
                      }}
                      type="text"
                      class="form-control"
                      placeholder="Student Grade"
                      aria-label="Student Grade"
                      name="Student_Grade"
                    />
                  </td>
                  <td>
                    <button
                      type="submit"
                      style={{
                        height: "25px",
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "#996ae4",
                      }}
                      onClick={() => {
                        setsemsterId(mainsemester._id); // Use setselectedSemesterId here
                        setstudentId(student.studentId._id);
                        setcourseId(student.coursesRegisterd[0]._id);
                      }}
                    >
                      Upload
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Courses;
