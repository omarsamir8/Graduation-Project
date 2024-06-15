import { useEffect, useState } from "react";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
import Swal from "sweetalert2";
import { red } from "@mui/material/colors";
// import { Form } from "react-router-dom";
import { routes } from "../routes";
import axios from "axios";
import Select from "react-select";
import { useStudentContext } from "../StudentContext";
import TitleAnimation from "../Loader/TitleAnimation";

function CreateStudent() {
  const [Full_Name, setFull_Name] = useState("");
  const [National_Id, setNational_Id] = useState("");
  const [Student_Code, setStudent_Code] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Date_of_Birth, setDate_of_Birth] = useState("");
  const [gender, setgender] = useState("");
  const [department, setdepartment] = useState("");
  const [message, setmessage] = useState("");
  const [studentImage, setstudentImage] = useState([]);
  const [studentId, setstudentId] = useState("");
  const { allstudents, setallstudents } = useStudentContext();
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [loading, setLoading] = useState(false);
  const createstudent = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.student._id}${routes.student.createStudent}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            Full_Name,
            PhoneNumber,
            Student_Code,
            National_Id,
            Date_of_Birth,
            gender,
            department,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setmessage(data.message);
      if (response.ok) {
        // Show SweetAlert on success
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Student added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
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
      console.error("Login failed", error);
    }
  };

  // Upload Student Image
  const uploadstudentimage = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("studentImage", studentImage);
      formData.append("studentId", studentId);

      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.student._id}${routes.student.AddImgByAdmin}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      setmessage(data.message);
      if (response.ok) {
        setLoading(false);
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Student Image added successfully",
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
      // window.location.reload();
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  if (loading) {
    return <TitleAnimation />;
  }

  return (
    <>
      <div className="Create_Student">
        <h2 className="create_student">Add Student</h2>
        <marquee className="marquee" scrollamount="10">
          {" "}
          It is not possible for more than one student to have the same national
          ID,Full Name, student code, phone number{" "}
        </marquee>
        <form class="row mt-4">
          <div class="col ">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Full Name"
              aria-label="Full_Name"
              name="Full_Name"
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
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />

            <select
              className="form-control mt-3"
              aria-label="gender"
              name="gender"
              onChange={(e) => {
                setgender(e.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
              <option value="not specify">Not Specify</option>
            </select>
            <input
              type="file"
              class="form-control mt-3"
              placeholder="Enter Student Image"
              aria-label="studentImage"
              name="studentImage"
              onChange={(e) => {
                setstudentImage(e.target.files[0]);
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
              onChange={(e) => {
                setDate_of_Birth(e.target.value);
              }}
            />
            <Select
              isMulti
              name="colors"
              options={allstudents.map((student) => {
                return { value: student._id, label: student.Full_Name };
              })}
              onChange={(selectedOptions) => {
                const selectedLabels = selectedOptions.map(
                  (option) => option.value
                );
                setstudentId(selectedLabels);
              }}
              className="Materials_select"
              classNamePrefix="select"
              placeholder="Enter Student ID"
            />
          </div>
        </form>

        <button
          type="button"
          class="btn btn-primary mt-3"
          onClick={createstudent}
        >
          Submit
        </button>
        <button
          style={{ marginLeft: "10px", width: "150px" }}
          type="button"
          class="btn btn-primary mt-3"
          onClick={uploadstudentimage}
        >
          Upload Photo
        </button>
      </div>
    </>
  );
}
export default CreateStudent;
