import Select from "react-select";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/studentgradesearchbysuberadmin.css";
import Swal from "sweetalert2";
import { routes } from "../routes";
import { Table } from "react-bootstrap";
import TitleAnimation from "../Loader/TitleAnimation";

function StudentGrades() {
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [courseId, setcourseId] = useState("");
  const [studentId, setstudentId] = useState("");
  const [allcourses, setallcourses] = useState([]);
  const [allstudents, setallstudents] = useState([]);
  const [FinalExam, setFinalExam] = useState("");
  const [Oral, setOral] = useState("");
  const [Midterm, setMidterm] = useState("");
  const [Practical, setPractical] = useState("");
  const [AllSemesters, setAllSemesters] = useState("");
  const [semsterId, setsemsterId] = useState("");
  const [resultsbysuberadmin, setresultsbysuberadmin] = useState([]);
  const [selectedGradeId, setselectedGradeId] = useState("");
  const [backToRegister, setbackToRegister] = useState("yes");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchsearchforcourse = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app/Api/courses/search/for/courses/by/Admin?sort=-course_name&page=1&size=10`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        const data = response.data;
        console.log(data);
        setallcourses(data.courses);
        console.log(allcourses);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchsearchforcourse();
  }, [accessToken, refreshToken]);

  // get all students
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://university-mohamed.vercel.app/Api/students/search/for/students?sort=_id&select=Student_Code,National_Id,Full_Name,Date_of_Birth,PhoneNumber&page=1&size=20`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );

      console.log(response.data);
      setallstudents(response.data.students);
    } catch (error) {
      console.error("Error fetching admin info:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [accessToken, refreshToken]);
  console.log(allstudents);
  // upload grade
  const Upload_grade = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app/Api/students/Grades/add/grade/by/admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            courseId,
            studentId,
            semsterId,
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
  console.log(courseId, studentId, semsterId);
  // get all semester
  const fetchDataa = async () => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app/Api/semsters/search/semster?page=1&size=20`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      const data = await response.json();
      setAllSemesters(data.semsters);
    } catch (error) {
      console.error("Fetch failed", error);
    }
  };
  useEffect(() => {
    fetchDataa();
  }, [accessToken, refreshToken]);
  console.log(AllSemesters);
  // search result of grades for students
  const fetchDataaa = async () => {
    try {
      const response = await axios.get(
        `https://university-mohamed.vercel.app/Api/students/Grades/search/by/admin?courseId=${courseId}&semsterId=${semsterId}&studentId=${studentId}&size=8&page=1&select=studentId,courseId,Points,Grade,TotalGrate,Midterm,Practical,Oral,FinalExam,YearWorks&sort=studentId.Full_Name`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response.data);
      setresultsbysuberadmin(response.data.grades);
    } catch (error) {
      console.error("Error fetching doctor info:", error);
    }
  };
  useEffect(() => {
    fetchDataaa();
  }, [accessToken, refreshToken, courseId, semsterId, studentId]);

  // update grade
  const updateGrade = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app/Api/students/Grades/update/grade/by/admin?GradeId=${selectedGradeId}`,
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
        setresultsbysuberadmin((prevGrades) =>
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
  console.log(selectedGradeId);
  // delete grade
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
          `https://university-mohamed.vercel.app/Api/students/Grades/delete/grade/by/admin?GradeId=${GradeId}`,
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
          setresultsbysuberadmin((prevGrade) =>
            prevGrade.filter((grade) => grade._id !== GradeId)
          );
          console.log(`Course with ID ${courseId} deleted successfully.`);
        } else {
          setLoading(false);
          console.error(`Failed to delete course with ID ${GradeId}.`);
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
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <marquee className="marquee" scrollamount="10">
          {" "}
          This section is related to update any grade for previous semesters for
          any student{" "}
        </marquee>
        <Select
          isMulti
          name="colors"
          options={allcourses.map((course) => {
            return { value: course._id, label: course.course_name };
          })}
          onChange={(selectedOptions) => {
            const selectedLabels = selectedOptions.map(
              (option) => option.value
            );
            setcourseId(selectedLabels.join());
          }}
          className="Materials_select2"
          classNamePrefix="select"
          placeholder="Select Course ID"
        />
        <Select
          styles={{ width: "350px" }}
          isMulti
          name="colors"
          options={allstudents.map((student) => {
            return { value: student._id, label: student.Full_Name };
          })}
          onChange={(selectedOptions) => {
            const selectedLabels = selectedOptions.map(
              (option) => option.value
            );
            setstudentId(selectedLabels.join());
          }}
          className="Materials_select2"
          classNamePrefix="select"
          placeholder="Select Student ID"
        />
        <Select
          styles={{ width: "350px" }}
          isMulti
          name="colors"
          options={
            AllSemesters
              ? AllSemesters.map((sem) => {
                  return { value: sem._id, label: sem.name };
                })
              : null
          }
          onChange={(selectedOptions) => {
            const selectedLabels = selectedOptions.map(
              (option) => option.value
            );
            setsemsterId(selectedLabels.join());
          }}
          className="Materials_select2"
          classNamePrefix="select"
          placeholder="Select Semster ID"
        />
        <input
          style={{ width: "30%", height: "40px" }}
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
          style={{ width: "30%", height: "40px" }}
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
          style={{ width: "30%", height: "40px" }}
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
          style={{ width: "30%", height: "40px" }}
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
          style={{ width: "305px" }}
          type="button"
          className="btn btn-primary mt-1"
          onClick={() => {
            Upload_grade();
          }}
        >
          Upload Grade
        </button>
        <button
          style={{ width: "305px" }}
          type="button"
          className="btn btn-primary mt-1"
          onClick={() => {
            updateGrade();
          }}
        >
          Update Grade
        </button>
      </div>
      <Table
        style={{ marginTop: "20px", textAlign: "center" }}
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
          {resultsbysuberadmin.map((results, index) => {
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
    </>
  );
}

export default StudentGrades;
