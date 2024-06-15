import { React, useEffect, useState } from "react";
import axios from "axios";
import TitleAnimation from "../Loader/TitleAnimation";

function StudentsResult() {
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [StudentResult, setStudentResult] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async (CourseId) => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://university-mohamed.vercel.app/Api/student/Grades/studentsGratesSearch?courseId=66188a91d5b17e5f2fa2f491",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setStudentResult(response.data.grades);
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
  }, [accessToken, refreshToken, loading]);
  console.log(StudentResult);
  if (loading) {
    return <TitleAnimation />;
  }
  return (
    <>
      <div style={{ marginTop: "1rem" }} className="get_all_student">
        <h2 style={{ marginLeft: ".7rem" }}> All Students Reg Course </h2>
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
            <tr>
              <th scope="row">1</th>
              <td>2</td>
              <td>5</td>
              <td>1</td>
              <td>2</td>
              <td>1</td>

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
                  onClick={() => {}}
                >
                  Upload
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default StudentsResult;
