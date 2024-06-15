import { useState, useEffect } from "react";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
import Swal from "sweetalert2";

import { useDoctorContext } from "../DoctorContext";
import Select from "react-select";
import { routes } from "../routes";
import { Table } from "react-bootstrap";
import { usePageContext } from "../PageContext";
import { Link } from "react-router-dom";
import TitleAnimation from "../Loader/TitleAnimation";

function AllDoctors() {
  const { alldoctors, setalldoctors } = useDoctorContext();
  let { Page, setPage } = usePageContext(1);
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
  const [count, setcount] = useState(1);
  const [Materials, setMaterials] = useState();
  const [allcourses, setallcourses] = useState([]);
  const [alltrainingsAvailable, setalltrainingsAvailable] = useState([]);
  const [Training, setTraining] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [loading, setLoading] = useState(false);

  //  delete doctors
  const handleDelete = async (doctorId) => {
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
          `https://university-mohamed.vercel.app${routes.instructor._id}${routes.instructor.deleteInstructor}?userId=${doctorId}`,
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
          setalldoctors((prevDoctors) =>
            prevDoctors.filter((doctor) => doctor._id !== doctorId)
          );
          console.log(`Doctor with ID ${doctorId} deleted successfully.`);
          Swal.fire({
            icon: "success",
            title: "Doctor Deleted successfully",
            showConfirmButton: false,
            timer: 3500,
          });
        } else {
          setLoading(false);
          console.error(`Failed to delete doctor with ID ${doctorId}.`);
          Swal.fire({
            icon: "error",
            title: "Doctor Deleted Failed",
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
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.instructor._id}${routes.instructor.updateInstructor}?userId=${selecteddoctor._id}`,
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
            Materials,
            Training,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
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
  const loadMore = () => {
    // Increment the count when loading more
    setcount((prevCount) => prevCount + 1);
  };

  // /////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.course._id}${routes.course.searchCourseByAdmin}?size=20&sort=course_name`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data.courses)) {
          setallcourses((prevCourses) => [...prevCourses, ...data.courses]);
        }
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    console.log(allcourses);
  }, [allcourses]);
  // ///////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.Training._id}${routes.Training.allTrainingByAdmin}?page=1&size=20&sort=training_name`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        const data = await response.json();
        setalltrainingsAvailable(data.trainings);
        console.log(data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  const increment = () => {
    setPage((prevPage) => prevPage + 1);
    // Increment count by 1
  };
  const decrement = () => {
    setPage((prevPage) => prevPage - 1);
    // Increment count by 1
  };
  if (loading) {
    return <TitleAnimation />;
  }
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
              <option value="cs">CS </option>
              <option value="ai">AI </option>
              <option value="sc">SC</option>
              <option value="not specify">Not Specify</option>{" "}
              {/* Add more options as needed */}
            </select>
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
                setMaterials(selectedLabels);
              }}
              className="Materials_select"
              classNamePrefix="select"
              placeholder="Select Doctor Matarial"
            />
            <Select
              isMulti
              name="Training"
              options={alltrainingsAvailable.map((training) => {
                return { value: training._id, label: training.training_name };
              })}
              onChange={(selectedOptions) => {
                const selectedLabels = selectedOptions.map(
                  (option) => option.value
                );
                setTraining(selectedLabels);
              }}
              className="Materials_select"
              classNamePrefix="select"
              placeholder="Select Doctor Training"
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
          style={{
            backgroundColor: "#996ae4",
            borderColor: "#996ae4",
          }}
          className="btn btn-primary mt-3"
          onClick={updateDoctor}
        >
          Update
        </button>
      </div>
      <div className="get_all_student">
        <h2 className="getallstudent" style={{ marginLeft: "0rem" }}>
          All Doctors Available{" "}
        </h2>
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
                Email
              </th>
              <th className="doctorInfo" scope="col">
                Phone
              </th>
              <th className="doctorInfo" scope="col">
                Department
              </th>
              <th className="doctorInfo" scope="col">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {alldoctors.map((doctor, index) => (
              <tr key={doctor._id}>
                <th className="doctorInfo" scope="row">
                  {index + 1}
                </th>
                <td className="doctorInfo">{doctor.FullName}</td>
                <td className="doctorInfo">{doctor.email}</td>
                <td className="doctorInfo">{doctor.phone}</td>
                <td className="doctorInfo">{doctor.department}</td>
                <td>
                  <div style={{ flexWrap: "nowrap" }} className="row">
                    <button
                      style={{
                        backgroundColor: "#996ae4",
                        borderColor: "#996ae4",
                      }}
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
                    <button type="button" className="btn btn-secondary">
                      <Link to={`/doctor/${doctor._id}`} className="link">
                        More Info
                      </Link>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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

export default AllDoctors;
