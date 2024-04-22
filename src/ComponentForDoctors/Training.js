import { Link, NavLink } from "react-router-dom";
import { $Dashboard2_Components } from "../Atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { routes } from "../routes";

function Training() {
  const [selectedComponent2, setSelectedComponent2] = useRecoilState(
    $Dashboard2_Components
  );
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [doctorTrainings, setdoctorTrainings] = useState([]);
  const [allstudentregistertraining, setallstudentregistertraining] = useState(
    []
  );
  const [studentId, setstudentId] = useState("");
  const [trainingId, settrainingId] = useState("");
  const [grade, setgrade] = useState("");

  useEffect(() => {
    const fetchData = async () => {
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

        setdoctorTrainings(response.data.user.Training);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken, setSelectedComponent2]);

  const deleteTraining = async (trainingId) => {
    try {
      const response = await axios.delete(
        `https://university-mohamed.vercel.app/Api/instructor/training/${trainingId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response.data);

      // Remove the deleted training from the state
      setdoctorTrainings((prevTrainings) =>
        prevTrainings.filter((training) => training._id !== trainingId)
      );
    } catch (error) {
      console.error("Error deleting training:", error);
    }
  };

  // Function to get students registered in a course
  const fetchRegisteredStudents = async (trainingId) => {
    console.log(trainingId);
    try {
      const response = await axios.get(
        `https://university-mohamed.vercel.app${routes.RegisterTraining._id}${routes.RegisterTraining.searchTrainingsRegisterdByInstructor}?select=studentId,trainingRegisterd&trainingId=${trainingId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(trainingId);
      console.log(response.data);
      setallstudentregistertraining(response.data.TrainingRegisted);
    } catch (error) {
      console.error("Error fetching registered students:", error);
    }
  };
  console.log(allstudentregistertraining);

  // upload training grade
  const Upload_grade = async (studentId, trainingId) => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.TrainingResult._id}${routes.TrainingResult.uploadByInstructor}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            studentId,
            trainingId,
            grade,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Upload Training grade successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: data.error_Message[0].message,
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
        {doctorTrainings.map((training) => {
          return (
            <div className="course" key={training._id}>
              <div className="info">
                <p>{training.training_name}</p>
                <NavLink style={{ textDecoration: "none" }} className="NavLink">
                  <button
                    onClick={() => {
                      fetchRegisteredStudents(training._id);
                    }}
                    type="button"
                    className="btn btn-primary"
                  >
                    Students
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    type="button"
                    className="btn btn-primary"
                  >
                    <Link to={`/traiingres/${training._id}`} className="link">
                      Result
                    </Link>
                  </button>
                </NavLink>
              </div>
              <div className="img " />
            </div>
          );
        })}
      </div>
      <div className="get_all_student">
        {allstudentregistertraining.length > 0 && (
          <>
            <h2> All Students Reg Training </h2>
            <table style={{ textAlign: "center" }} className="table">
              <thead>
                <tr>
                  <th scope="col">#ID</th>
                  <th scope="col">FullName</th>
                  <th scope="col">Student_Code</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Training_Id</th>
                  <th scope="col">Training_State</th>
                  <th scope="col">Submit</th>
                </tr>
              </thead>
              <tbody>
                {allstudentregistertraining.map((student, index = 1) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{student.studentId.Full_Name}</td>
                      <td>{student.studentId.Student_Code}</td>
                      <td>{student.studentId.PhoneNumber}</td>
                      <td>{student.studentId.gender}</td>
                      <td>{student.trainingRegisterd[0]._id} </td>

                      <td>
                        {" "}
                        <input
                          style={{
                            width: "150px",
                            alignItems: "center",
                            height: "25px",
                          }}
                          type="text"
                          className="form-control"
                          placeholder="Student Grade"
                          aria-label="Student Grade"
                          name="grade"
                          value={grade}
                          onChange={(e) => {
                            setgrade(e.target.value);
                          }}
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
                            // setstudentId();
                            // settrainingId();
                            Upload_grade(
                              student.studentId._id,
                              student.trainingRegisterd[0]._id
                            );
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
          </>
        )}
      </div>
    </>
  );
}

export default Training;
