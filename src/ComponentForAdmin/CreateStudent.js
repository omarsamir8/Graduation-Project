import { useState } from "react";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
import Swal from "sweetalert2";
import { red } from "@mui/material/colors";
// import { Form } from "react-router-dom";
function CreateStudent() {
  const [Full_Name, setFull_Name] = useState("");
  const [National_Id, setNational_Id] = useState("");
  const [Student_Code, setStudent_Code] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Date_of_Birth, setDate_of_Birth] = useState("");
  const [gender, setgender] = useState("");
  const [semesterId, setsemesterId] = useState("");
  const [message, setmessage] = useState("");

  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  const createstudent = async () => {
    try {
      const response = await fetch(
        "https://university-lyart.vercel.app/Api/user/addstudent",
        {
          method: "POST",
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
      const data = await response.json();
      console.log(data);
      setmessage(data.message);
      if (response.ok) {
        // Show SweetAlert on success

        Swal.fire({
          icon: "success",
          title: "Student added successfully",
          showConfirmButton: false,
          timer: 3500,
        });

        // Reset the form or perform any other actions on success
        // setFull_Name("");
        // setNational_Id("");
        // setStudent_Code("");
        // setPhoneNumber("");
        // setDate_of_Birth("");
        // setgender("");
        // setsemesterId("");
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Student created failed, please try again later",
          timer: 4500,
        });

        // Reset the form or perform any other actions on error
        // setFull_Name("");
        // setNational_Id("");
        // setStudent_Code("");
        // setPhoneNumber("");
        // setDate_of_Birth("");
        // setgender("");
        // setsemesterId("");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <div className="Create_Student">
        <h2 className="create_student">Add Student</h2>
        <marquee className="marquee" scrollamount="10">
          {" "}
          It is not possible for more than one student to have the same national
          number, student code, phone number, or phone number{" "}
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

            <input
              type="text"
              class="form-control mt-3"
              placeholder="semesterId"
              aria-label="semesterId"
              name="semesterId"
              onChange={(e) => {
                setsemesterId(e.target.value);
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
          </div>
        </form>

        <button
          type="button"
          class="btn btn-primary mt-3"
          onClick={createstudent}
        >
          Submit
        </button>
      </div>
    </>
  );
}
export default CreateStudent;
