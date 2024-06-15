import { Link, NavLink } from "react-router-dom";
import { $Dashboard2_Components } from "../Atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { routes } from "../routes";
import { Table } from "react-bootstrap";
import defulatimg from "../assets/traing2jpeg.jpeg";
import TitleAnimation from "../Loader/TitleAnimation";

function Training() {
  const [selectedComponent2, setSelectedComponent2] = useRecoilState(
    $Dashboard2_Components
  );
  const [selectedTrainingResultId, setselectedTrainingResultId] = useState("");
  const [TrainingId, setTrainingId] = useState("");
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [doctorTrainings, setdoctorTrainings] = useState([]);
  const [allstudentregistertraining, setallstudentregistertraining] = useState(
    []
  );
  const [studentId, setstudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [grade, setgrade] = useState("");
  const [studentResultReport, setStudentResultReport] = useState([]);

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
        setdoctorTrainings(response.data.user.Training);
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
    setLoading(true);
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
      if (response.ok) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching registered students:", error);
    }
  };
  console.log(allstudentregistertraining);

  // upload training grade
  const Upload_grade = async (studentId, trainingId) => {
    setLoading(true);
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
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Upload Training grade successfully",
          showConfirmButton: false,
          timer: 3500,
        });
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
      console.error("Upload grade failed", error);
    }
  };

  // update grade
  const updateGrade = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app/Api/Trainings/Results/update/result/by/instructor?TrainingResultId=${selectedTrainingResultId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            studentId,
            // TrainingId,
            grade,
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
        setStudentResultReport((prevGrades) =>
          prevGrades.map((prevGrade) =>
            prevGrade._id === selectedTrainingResultId
              ? {
                  ...prevGrade,

                  studentId,
                  grade,
                  TrainingId,
                }
              : prevGrade
          )
        );

        // Clear the selected course and reset input fields
        setgrade(null);
        // setselectedTrainingResultId(null);
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
  // Get result of training for student

  const fetchResultData = async (trainingId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://university-mohamed.vercel.app/Api/Trainings/Results/search/trainings/result/by/instructor?select=trainingId,studentId,grade&trainingId=${trainingId}&page=1&size=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response.data);
      setStudentResultReport(response.data.training || []);
      if (response.ok) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching student result:", error);
    }
  };
  if (loading) {
    return <TitleAnimation />;
  }
  return (
    <>
      <div className="enrollcourse">
        {doctorTrainings.map((training) => {
          return (
            <div
              style={{ height: "400px" }}
              className="course"
              key={training._id}
            >
              <p className="open-now">Open Now</p>{" "}
              {training && training.images && training.images.length > 0 ? (
                <img src={training.images[0].url} alt="" />
              ) : (
                <img src={defulatimg} alt="" />
              )}
              <div className="info">
                <h3>{training.training_name}</h3>
              </div>
              <div className="up-del-btn">
                <button
                  onClick={() => {
                    fetchRegisteredStudents(training._id);
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  Students Register Training
                </button>
                <button
                  style={{ backgroundColor: "gray", borderColor: "gray" }}
                  type="button"
                  className="btn btn-primary"
                >
                  <Link to={`/traiingres/${training._id}`} className="link">
                    Report For Student Result
                  </Link>
                </button>

                <button
                  style={{
                    backgroundColor: "#996ae4",
                    borderColor: "#996ae4",
                  }}
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    fetchResultData(training._id);
                  }}
                >
                  Update Student Grade
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <h4 style={{ marginLeft: "10px", marginTop: "10px", fontWeight: "bold" }}>
        Update Grade
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
          name="Grade"
          value={studentId}
          onChange={(e) => {
            setstudentId(e.target.value);
          }}
          placeholder="Student Id"
          aria-label=".form-control-sm example"
        />
        {/* <input
          style={{ width: "30%", marginLeft: "10px", height: "40px" }}
          className="form-control form-control-sm"
          type="text"
          name="Training Id"
          value={selectedTrainingResultId}
          onChange={(e) => {
            setselectedTrainingResultId(e.target.value);
          }}
          placeholder="Training Result Id"
          aria-label=".form-control-sm example"
        /> */}

        <input
          style={{ width: "30%", marginLeft: "10px", height: "40px" }}
          className="form-control form-control-sm"
          type="text"
          name="Grade"
          value={grade}
          onChange={(e) => {
            setgrade(e.target.value);
          }}
          placeholder="State"
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
          onClick={updateGrade}
          type="button"
          className="btn "
        >
          Update Grade
        </button>
      </div>
      <div className="get_all_student">
        {allstudentregistertraining.length > 0 && (
          <>
            <h2> All Students Reg Training </h2>
            <Table
              striped
              bordered
              hover
              size="md"
              style={{ textAlign: "center" }}
              className="table"
            >
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
            </Table>
          </>
        )}
      </div>
      {studentResultReport.length > 0 && (
        <Table
          style={{ marginTop: "5rem", textAlign: "center" }}
          striped
          bordered
          hover
          size="md"
          className="col-12"
        >
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Student Name</th>
              <th scope="col">Training Name</th>
              <th scope="col">Grade</th>
              <th scope="col">Update</th>
            </tr>
          </thead>
          <tbody>
            {studentResultReport.map((results, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{results.studentId.Full_Name}</td>
                  <td>{results.trainingId.training_name}</td>
                  <td>{results.grade}</td>
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
                        setgrade(results.grade);
                        setselectedTrainingResultId(results._id);
                        setstudentId(results.studentId._id);
                        // setTrainingId(results.trainingId._id);
                      }}
                      type="button"
                      className="btn "
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Training;
