import { NavLink } from "react-router-dom";
import { $Dashboard2_Components } from "../Atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";

function Courses() {
  const [selectedComponent2, setSelectedComponent2] = useRecoilState(
    $Dashboard2_Components
  );
  const [allstudentregistercourses, setallstudentregistercourses] = useState(
    []
  );
  const [doctorMatarials, setdoctorMatarials] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // Function to get students registered in a course
  const fetchRegisteredStudents = async (courseId) => {
    console.log(courseId);
    try {
      const response = await axios.get(
        `https://university-mohamed.vercel.app/Api/student/register/searchRegister?select=studentId,coursesRegisterd&courseId=${courseId}`,
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
      <div className="get_all_student">
        <h2> All Students Reg Course </h2>
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
            {allstudentregistercourses.map((student) => {
              return (
                <tr key={student._id}>
                  <th scope="row">{student.studentId._id}</th>
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
                      className="grade_input"
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
