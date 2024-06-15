import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
import Select from "react-select";
import { routes } from "../routes";
import axios from "axios";
import { useDoctorContext } from "../DoctorContext";
import TitleAnimation from "../Loader/TitleAnimation";

function CreateDoctor() {
  const [FullName, setFullName] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [Date_of_Birth, setDate_of_Birth] = useState("");
  const [gender, setgender] = useState("");
  const [department, setdepartment] = useState("");
  const [Materials, setMaterials] = useState();
  const [message, setmessage] = useState("");
  const [allcourses, setallcourses] = useState([]);
  const [Training, setTraining] = useState([]);
  // const [doctors, setdoctors] = useState([]);
  const [alltrainingsAvailable, setalltrainingsAvailable] = useState([]);
  const [InstructorId, setInstructorId] = useState("");
  const [instructorImage, setinstructorImage] = useState([]);
  const { alldoctors, setalldoctors } = useDoctorContext();
  const [loading, setLoading] = useState(false);
  // const [training_name, settraining_name] = useState("");

  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // get all Courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.course._id}${routes.course.searchCourseByAdmin}?size=20&sort=course_name&page=1`,
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
  // create doctor
  const createdoctor = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.instructor._id}${routes.instructor.createInstructor}`,
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
            Materials,
            Training,
          }),
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
          title: "Doctor added successfully",
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

  // Fetch all Trainings
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
  console.log(alltrainingsAvailable);

  // upload Doctor Photo
  const uploadDoctorimage = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("instructorImage", instructorImage);
      formData.append("InstructorId", InstructorId);

      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.instructor._id}${routes.instructor.AddImgByAdmin}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
            // Remove "Content-Type" header since it's not needed for FormData
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
          title: "Doctor Image added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        setLoading(false);
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Doctor Image creation failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  // // search for doctor
  // const fetchDataa = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://university-mohamed.vercel.app${routes.instructor._id}${routes.instructor.searchInstructor}?page=1&size=20`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "refresh-token": refreshToken,
  //         },
  //       }
  //     );

  //     console.log(response.data);
  //     setdoctors(response.data.Instructors);
  //   } catch (error) {
  //     console.error("Error fetching admin info:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchDataa();
  // }, [accessToken, refreshToken]);
  // console.log(doctors);
  if (loading) {
    return <TitleAnimation />;
  }
  return (
    <>
      <div className="Create_Student">
        <h2 className="create_student">Add Doctor</h2>
        <marquee className="marquee" scrollamount="10">
          {" "}
          It is not possible for more than one doctor to have the same national
          ID,Full Name, email, phone number{" "}
        </marquee>
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
            <input
              type="file"
              class="form-control mt-3"
              placeholder="Enter Doctor Image"
              aria-label="instructorImage"
              name="instructorImage"
              onChange={(e) => {
                setinstructorImage(e.target.files[0]);
              }}
            />
            <Select
              isMulti
              name="Training"
              options={alldoctors.map((doctor) => {
                return { value: doctor._id, label: doctor.FullName };
              })}
              onChange={(selectedOptions, e) => {
                const selectedLabels = selectedOptions.map(
                  (option) => option.value
                );
                setInstructorId(selectedLabels);
              }}
              className="Materials_select"
              classNamePrefix="select"
              placeholder="Enter Doctor ID"
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
              placeholder=" Password must be start with upper char and nums "
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

            <Select
              isMulti
              name="colors"
              options={allcourses.map((course) => {
                return { value: course._id, label: course.course_name };
              })}
              onChange={(selectedOptions, e) => {
                const selectedLabels = selectedOptions.map(
                  (option) => option.value
                );
                setMaterials(selectedLabels);
              }}
              className="Materials_select"
              classNamePrefix="select"
              placeholder="Select Matarial"
            />
            <Select
              isMulti
              name="Training"
              options={alltrainingsAvailable.map((training) => {
                return { value: training._id, label: training.training_name };
              })}
              onChange={(selectedOptions, e) => {
                const selectedLabels = selectedOptions.map(
                  (option) => option.value
                );
                setTraining(selectedLabels);
              }}
              className="Materials_select"
              classNamePrefix="select"
              placeholder="Select Training"
            />
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={createdoctor}
        >
          Submit
        </button>
        <button
          style={{ marginLeft: "10px", width: "150px" }}
          type="button"
          className="btn btn-primary mt-3"
          onClick={uploadDoctorimage}
        >
          Upload Photo
        </button>
      </div>
    </>
  );
}
export default CreateDoctor;
