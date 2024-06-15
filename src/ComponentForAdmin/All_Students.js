import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
import Swal from "sweetalert2";
import { useStudentContext } from "../StudentContext";
import { routes } from "../routes";
import { Table } from "react-bootstrap";
import { usePageContext } from "../PageContext";
import { Link } from "react-router-dom";
import TitleAnimation from "../Loader/TitleAnimation";

function All_Students() {
  const { allstudents, setallstudents } = useStudentContext();
  let { Page, setPage } = usePageContext(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showform, setshowform] = useState("none");
  const [test, settest] = useState(false);
  const [Full_Name, setFull_Name] = useState("");
  const [National_Id, setNational_Id] = useState("");
  const [Student_Code, setStudent_Code] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Date_of_Birth, setDate_of_Birth] = useState("");
  const [gender, setgender] = useState("");
  const [semesterId, setsemesterId] = useState("");
  const [count, setcount] = useState(1);
  const [department, setdepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // delete student
  const handleDelete = async (studentId) => {
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
          `https://university-mohamed.vercel.app${routes.student._id}${routes.student.deleteStudent}?userId=${studentId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        if (response.ok) {
          setLoading(false);
          // Remove the deleted doctor from the state
          setallstudents((prevDoctors) =>
            prevDoctors.filter((student) => student._id !== studentId)
          );
          console.log(`Doctor with ID ${studentId} deleted successfully.`);
          Swal.fire({
            icon: "success",
            title: "Student Deleted successfully",
            showConfirmButton: false,
            timer: 3500,
          });
        } else {
          setLoading(false);
          console.error(`Failed to delete doctor with ID ${studentId}.`);
          Swal.fire({
            icon: "failed",
            title: "Student Deleted Failed",
            showConfirmButton: false,
            timer: 3500,
          });
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // return data into inputes
  function openUpdateModal(student) {
    test === false ? setshowform("block") : setshowform("none");
    setSelectedStudent(student);
    setFull_Name(student.Full_Name);
    setNational_Id(student.National_Id);
    setStudent_Code(student.Student_Code);
    setPhoneNumber(student.PhoneNumber);
    setDate_of_Birth(student.Date_of_Birth);
    setgender(student.gender);
    setsemesterId(student.semesterId);
  }
  // update students
  const updateStudent = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.student._id}${routes.student.updateStudent}?userId=${selectedStudent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            Full_Name,
            National_Id,
            Student_Code,
            PhoneNumber,
            Date_of_Birth,
            gender,
            semesterId,
            department,
            // studentImage,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Student updated successfully",
          showConfirmButton: false,
          timer: 3500,
        });

        // Update the state with the modified student
        setallstudents((prevStudents) =>
          prevStudents.map((prevStudent) =>
            prevStudent._id === selectedStudent._id
              ? {
                  ...prevStudent,
                  Full_Name,
                  Student_Code,
                  PhoneNumber,
                  semesterId,
                  National_Id,
                  Date_of_Birth,
                  gender,
                }
              : prevStudent
          )
        );

        // Clear the selected student and reset input fields
        setSelectedStudent("");
        setFull_Name("");
        setNational_Id("");
        setStudent_Code("");
        setPhoneNumber("");
        setDate_of_Birth("");
        setgender("");
        setsemesterId("");
      } else {
        setLoading(false);
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: data.error_Message
            ? data.error_Message[0].message
            : data.message,
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const increment = () => {
    setPage((prevPage) => prevPage + 1);
    // Increment count by 1
  };
  const decrement = () => {
    setPage((prevPage) => prevPage - 1);
    // Increment count by 1
  };
  console.log(Page);
  if (loading) {
    return <TitleAnimation />;
  }

  return (
    <>
      <div className="get_all_student">
        <div className="Create_Student" style={{ display: showform }}>
          <h2 className="create_student">Update Student</h2>
          <form class="row mt-4">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Full Name"
                aria-label="Full_Name"
                name="Full_Name"
                value={Full_Name}
                onChange={(e) => {
                  setFull_Name(e.target.value);
                }}
              />
              <input
                type="text"
                class="form-control mt-3"
                placeholder="Enter Phone Number"
                aria-label="PhoneNumber"
                name="PhoneNumber"
                value={PhoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <input
                type="text"
                class="form-control mt-3"
                placeholder="Enter Gender"
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={(e) => {
                  setgender(e.target.value);
                }}
              />
              <select
                className="form-control mt-3"
                aria-label="department"
                name="department"
                onChange={(e) => {
                  setdepartment(e.target.value);
                }}
              >
                <option value="" disabled selected hidden>
                  Select Department
                </option>
                <option value="is">IS</option>
                <option value="cs">CS</option>
                <option value="ai">AI</option>
                <option value="sc">SC</option>
                <option value="not specify">not specify</option>
              </select>
            </div>
            <div class="col part2">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Student Code"
                aria-label="Student_Code"
                name="Student_Code"
                value={Student_Code}
                onChange={(e) => {
                  setStudent_Code(e.target.value);
                }}
              />
              <input
                type="text"
                class="form-control mt-3"
                placeholder="Enter National Id"
                aria-label="National_Id"
                name="National_Id"
                value={National_Id}
                onChange={(e) => {
                  setNational_Id(e.target.value);
                }}
              />
              <input
                type="date"
                class="form-control mt-3"
                placeholder="Enter Date Of Birth"
                aria-label="Date_of_Birth"
                name="Date_of_Birth"
                value={Date_of_Birth}
                onChange={(e) => {
                  setDate_of_Birth(e.target.value);
                }}
              />
            </div>
          </form>
          <button
            type="button"
            class="btn btn-primary mt-3"
            onClick={updateStudent}
          >
            Update
          </button>
        </div>
        <marquee className="marquee" scrollamount="10">
          {" "}
          This section is related to all students exissting in BFCAI{" "}
        </marquee>
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th className="doctorInfo" scope="col">
                #ID
              </th>
              <th className="doctorInfo" scope="col">
                FullName
              </th>
              <th className="doctorInfo" scope="col">
                Student_code
              </th>
              <th className="doctorInfo" scope="col">
                Phone
              </th>
              <th className="doctorInfo" scope="col">
                Gender
              </th>
              {/* <th scope="col">Level</th> */}
              <th className="doctorInfo" scope="col">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {allstudents.map((student, index) => (
              <>
                {}
                <tr key={index + 1}>
                  <th className="doctorInfo" scope="row">
                    {index + 1}
                  </th>
                  <td className="doctorInfo">{student.Full_Name}</td>
                  <td className="doctorInfo">{student.Student_Code}</td>
                  <td className="doctorInfo">{student.PhoneNumber}</td>
                  <td className="doctorInfo">{student.gender}</td>
                  {/* <td>{student.semesterId.level}</td> */}
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <div className="row">
                      <button
                        style={{
                          backgroundColor: "#996ae4",
                          borderColor: "#996ae4",
                        }}
                        type="button"
                        onClick={() => openUpdateModal(student)}
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(student._id)}
                      >
                        Delete
                      </button>
                      <button type="button" className="btn btn-secondary">
                        <Link to={`/student/${student._id}`} className="link">
                          More Info
                        </Link>
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>
      {/* <div
        style={{
          width: "100%",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={increment}
      >
        <i
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "20px",
            fontSize: "40px",
            cursor: "pointer",
          }}
          class="fa-solid fa-spinner"
        ></i>
        <span
          style={{
            fontFamily: "cursive",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Load More
        </span>
      </div> */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li
              onClick={() => {
                decrement();
              }}
              class="page-item"
            >
              <a class="page-link" href="#previous" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li
              onClick={() => {
                setPage(1);
              }}
              class="page-item"
            >
              <a class="page-link" href="#1">
                1
              </a>
            </li>
            <li
              onClick={() => {
                setPage(2);
              }}
              class="page-item"
            >
              <a class="page-link" href="#2">
                2
              </a>
            </li>
            <li
              onClick={() => {
                setPage(3);
              }}
              class="page-item"
            >
              <a class="page-link" href="#3">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#3">
                ......
              </a>
            </li>
            <li class="page-item">
              <a
                onClick={() => {
                  increment();
                }}
                class="page-link"
                href="#next"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default All_Students;
