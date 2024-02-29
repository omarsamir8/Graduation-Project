import { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";

function CreateDoctor() {
  const [FullName, setFullName] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [Date_of_Birth, setDate_of_Birth] = useState("");
  const [gender, setgender] = useState("");
  const [department, setdepartment] = useState("");
  // const [Materials, setMaterials] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  const createdoctor = async () => {
    try {
      const response = await fetch(
        "http://16.16.200.210:5000/Api/Instructor/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            FullName,
            password,
            email,
            phone,
            Date_of_Birth,
            gender,
            department,
            // Materials, // Send the array directly
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Show SweetAlert on success

        Swal.fire({
          icon: "success",
          title: "Doctor added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Doctor creation failed, please try again later",
          timer: 4500,
        });

        // Reset the form or perform any other actions on error
        // Reset the Materials array
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <div className="Create_Student">
        <h2 className="create_student">Add Doctor</h2>
        <div class="row mt-4">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Full Name"
              aria-label="FullName"
              name="FullName"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />

            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter Phone Number"
              aria-label="phone "
              name="phone"
              onChange={(e) => {
                setphone(e.target.value);
              }}
            />
            <input
              type="gender"
              class="form-control mt-3"
              placeholder="Enter Gender"
              aria-label="gender"
              name="gender"
              onChange={(e) => {
                setgender(e.target.value);
              }}
            />
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter Department"
              aria-label="department"
              name="department"
              onChange={(e) => {
                setdepartment(e.target.value);
              }}
            />
          </div>
          <div class="col part2">
            <input
              type="email"
              class="form-control"
              placeholder="Enter Email"
              aria-label="email"
              name="email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter Password "
              aria-label="password"
              name="password"
              onChange={(e) => {
                setpassword(e.target.value);
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
            {/* <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter Materials"
              aria-label="Materials"
              name="Materials"
              onChange={(e) => {
                setMaterials(e.target.value);
              }}
            /> */}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={createdoctor}
        >
          Submit
        </button>
      </div>
    </>
  );
}
export default CreateDoctor;
