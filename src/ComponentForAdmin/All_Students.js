import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function All_Students() {
  const [allstudents, setallstudents] = useState([]);
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

  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  // get all students
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://university-system-rosy.vercel.app/Api/user/searchuser?select=Full_Name,Student_Code,semesterId,PhoneNumber,level&size=15",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = await response.json();
        setallstudents(data.students);
        console.log(data.students);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  // delete student
  const handleDelete = async (studentId) => {
    try {
      const response = await fetch(
        `https://university-system-rosy.vercel.app/Api/user/deleteStudent?userId=${studentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );

      if (response.ok) {
        // Remove the deleted student from the state
        setallstudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== studentId)
        );
        console.log(`Student with ID ${studentId} deleted successfully.`);
      } else {
        console.error(`Failed to delete student with ID ${studentId}.`);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  // return data into inputes
  const openUpdateModal = (student) => {
    test === false ? setshowform("block") : setshowform("none");
    setSelectedStudent(student);
    setFull_Name(student.Full_Name);
    setNational_Id(student.National_Id);
    setStudent_Code(student.Student_Code);
    setPhoneNumber(student.PhoneNumber);
    setDate_of_Birth(student.Date_of_Birth);
    setgender(student.gender);
    setsemesterId(student.semesterId);
  };
  // update students
  const updateStudent = async () => {
    try {
      const response = await fetch(
        `https://university-system-rosy.vercel.app/Api/user/updateStudent?userId=${selectedStudent._id}`,
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

              <input
                type="text"
                class="form-control mt-3"
                placeholder="semesterId"
                aria-label="semesterId"
                name="semesterId"
                value={semesterId}
                onChange={(e) => {
                  setsemesterId(e.target.value);
                }}
              />
            </div>
            <div class="col">
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
        <h2>Get All Students </h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">FullName</th>
              <th scope="col">Student_code</th>
              <th scope="col">Phone</th>
              <th scope="col">Level</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {allstudents.map((student) => (
              <tr key={student._id}>
                <th scope="row">{student._id}</th>
                <td>{student.Full_Name}</td>
                <td>{student.Student_Code}</td>
                <td>{student.PhoneNumber}</td>
                <td>{student.semesterId.level}</td>
                <td>
                  <div className="row">
                    <button
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
    </>
  );
}

export default All_Students;
