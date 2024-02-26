import { useState } from "react";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
import Swal from "sweetalert2";
import { useEffect } from "react";

function AllDoctors() {
  const [alldoctors, setalldoctors] = useState([]);
  const [selecteddoctor, setSelecteddoctor] = useState(null);
  const [FullName, setFullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [Date_of_Birth, setDate_of_Birth] = useState("");
  const [gender, setgender] = useState("");
  const [department, setdepartment] = useState("");
  const [showform, setshowform] = useState("none");
  const [test, settest] = useState(false);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // get all doctors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://university-system-rosy.vercel.app/Api/instructor/search?sort=1&select=email,FullName,Materials,phone,department&size=5",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = await response.json();
        setalldoctors(data.Instructor);
        console.log(data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    console.log(alldoctors);
  }, [alldoctors]);
  //  delete doctors
  const handleDelete = async (doctorId) => {
    try {
      const response = await fetch(
        `https://university-system-rosy.vercel.app/Api/instructor/delete?userId=${doctorId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );

      if (response.ok) {
        // Remove the deleted doctor from the state
        setalldoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor._id !== doctorId)
        );
        console.log(`Doctor with ID ${doctorId} deleted successfully.`);
      } else {
        console.error(`Failed to delete doctor with ID ${doctorId}.`);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  // return data into inputes
  const openUpdateModal = (doctor) => {
    test === false ? setshowform("block") : setshowform("none");
    setSelecteddoctor(doctor);
    setFullName(doctor.FullName);
    setemail(doctor.email);
    setDate_of_Birth(doctor.Date_of_Birth);
    setgender(doctor.gender || ""); // Provide a default value for gender
    setphone(doctor.phone);
    setdepartment(doctor.department);
    setpassword(doctor.password);
  };
  // update Doctor
  const updateDoctor = async () => {
    try {
      const response = await fetch(
        `https://university-system-rosy.vercel.app/Api/instructor/update?userId=${selecteddoctor._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            FullName,
            email,
            gender,
            Date_of_Birth,
            password,
            phone,
            department,
          }),
        }
      );

      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Doctor updated successfully",
          showConfirmButton: false,
          timer: 3500,
        });

        // Update the state with the modified doctor
        setalldoctors((prevDoctors) =>
          prevDoctors.map((prevDoctor) =>
            prevDoctor._id === selecteddoctor._id
              ? {
                  ...prevDoctor,
                  FullName,
                  email,
                  phone,
                  gender,
                  department,
                  password,
                  Date_of_Birth,
                }
              : prevDoctor
          )
        );

        // Clear the selected doctor and reset input fields
        setSelecteddoctor(null);
        setFullName("");
        setemail("");
        setDate_of_Birth("");
        setgender("");
        setpassword("");
        setphone("");
        setdepartment("");
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Doctor update failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };
  return (
    <>
      <div className="Create_Student" style={{ display: showform }}>
        <h2 className="create_student">Update Doctor</h2>
        <div class="row mt-4">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Full Name"
              aria-label="FullName"
              name="FullName"
              value={FullName}
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
              value={phone}
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
              value={gender}
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
              value={department}
              onChange={(e) => {
                setdepartment(e.target.value);
              }}
            />
          </div>
          <div class="col">
            <input
              type="email"
              class="form-control"
              placeholder="Enter Email"
              aria-label="email"
              name="email"
              value={email}
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
              value={password}
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
              value={Date_of_Birth}
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
          onClick={updateDoctor}
        >
          Update
        </button>
      </div>
      <div className="get_all_student">
        <h2>Get All Doctor </h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">FullName</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Department</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {alldoctors.map((doctor) => (
              <tr key={doctor._id}>
                <th scope="row">{doctor._id}</th>
                <td>{doctor.FullName}</td>
                <td>{doctor.email}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.department}</td>
                <td>
                  <div style={{ flexWrap: "nowrap" }} className="row">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => openUpdateModal(doctor)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(doctor._id)}
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

export default AllDoctors;
