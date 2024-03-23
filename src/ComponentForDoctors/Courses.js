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
    try {
      const response = await axios.get(
        `https://university-mohamed.vercel.app/Api/student/register/searchRegister?=courseId=${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response.data);
      console.log(response.data.message);
      setallstudentregistercourses(response.data);
    } catch (error) {
      console.error("Error fetching registered students:", error);
    }
  };

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
            <div className="course" key={material.course_id}>
              <div className="info">
                <p>{material.course_name}</p>
                <NavLink
                  onClick={() => fetchRegisteredStudents(material.course_id)}
                  style={{ textDecoration: "none" }}
                  className="NavLink"
                >
                  <button type="button" className="btn btn-primary">
                    Students
                  </button>
                </NavLink>
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
              <th scope="col">Phone</th>
              <th scope="col">Level</th>
              <th scope="col">Corse_Id</th>
              <th scope="col">Corse_Grade</th>
              <th scope="col">Submit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

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
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

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
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

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
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

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
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

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
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

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
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

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
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">8</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

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
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">9</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

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
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">10</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

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

export default Courses;
