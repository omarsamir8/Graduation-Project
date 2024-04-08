import React, { useEffect, useState } from "react";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
import Swal from "sweetalert2";
import { useStudentContext } from "../StudentContext";

function All_Students() {
  const { allstudents, setallstudents } = useStudentContext();
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
        const response = await fetch(
          `https://university-mohamed.vercel.app/Api/user/deleteStudent?userId=${studentId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        if (!response.ok) {
          // Remove the deleted doctor from the state
          setallstudents((prevDoctors) =>
            prevDoctors.filter((student) => student._id !== studentId)
          );
          console.log(`Doctor with ID ${studentId} deleted successfully.`);
        } else {
          console.error(`Failed to delete doctor with ID ${studentId}.`);
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
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app/Api/user/updateStudent?userId=${selectedStudent._id}`,
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
          }),
        }
      );

      if (response.ok) {
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
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Student update failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const loadMore = () => {
    // Increment the count when loading more
    setcount((prevCount) => prevCount + 1);
  };
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
        <h2>All Students Available </h2>
        <table className="table">
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
              {/* <th scope="col">Level</th> */}
              <th className="doctorInfo" scope="col">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {allstudents.map((student) => (
              <tr key={student._id}>
                <th className="doctorInfo" scope="row">
                  {student._id}
                </th>
                <td className="doctorInfo">{student.Full_Name}</td>
                <td className="doctorInfo">{student.Student_Code}</td>
                <td className="doctorInfo">{student.PhoneNumber}</td>
                {/* <td>{student.semesterId.level}</td> */}
                <td>
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <button
        style={{
          width: "320px",
          height: "50px",
          border: "none",
          outline: "none",
          background: "#996ae4",
          borderRadius: "10px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          color: "white",
          marginLeft: "10px",
          marginBottom: "20px",
          fontSize: "22px",
        }}
        onClick={loadMore}
      >
        Loading More
      </button> */}
    </>
  );
}

export default All_Students;
