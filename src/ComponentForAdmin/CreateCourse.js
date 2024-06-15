import React, { useEffect, useState } from "react";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
import Select from "react-select";
import { routes } from "../routes";
import Swal from "sweetalert2";
import { useCourseContext } from "../CourseContext";
import testImg from "../assets/traing2jpeg.jpeg";
import { usePageContext } from "../PageContext";
import TitleAnimation from "../Loader/TitleAnimation";
function CreateCourse() {
  const [course_name, setcourse_name] = useState("");
  const [Prerequisites, setPrerequisites] = useState([]);
  const [credit_hour, setcredit_hour] = useState("");
  const [OpenForRegistration, setOpenForRegistration] = useState("");
  const [desc, setdesc] = useState("");
  const { allcourses, setallcourses } = useCourseContext();
  const [allcoursees, setallcoursees] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [message, setmessage] = useState("");
  const [department, setdepartment] = useState([]);
  let { Page, setPage } = usePageContext(1);
  const [courseImage, setcourseImage] = useState([]);
  const [courseId, setcourseId] = useState("");
  const [courses, setcourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const departments = [
    { value: "cs", title: "Computer Science" },
    { value: "is", title: "Information Systems" },
    { value: "sc", title: "Software Engineering" },
    { value: "ai", title: "Artificial Intelligence" },
  ];
  // create course
  const createcourse = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.course._id}${routes.course.AddCourse}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            course_name,
            credit_hour,
            OpenForRegistration,
            desc,
            Prerequisites,
            department,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setmessage(data.message);
      console.log(data.message);

      if (response.ok) {
        setLoading(false);
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Course added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        setLoading(false);
        // Show an error message if needed
        if (data.message === "Course name already exists") {
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: `${data.message}`,
            timer: 4500,
          });
        } else if (data.message === "validation Error") {
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: data.error_Message
              ? data.error_Message[0].message
              : data.message,
            timer: 4500,
          });
        }
      }
    } catch (error) {
      console.error("Create course failed", error);
    }
  };

  // get all Courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.course._id}${routes.course.searchCourseByAdmin}?page=1&size=10&select=course_name,credit_hour,ImgUrls`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        const data = await response.json();
        if (Array.isArray(data.courses)) {
          setallcoursees((prevCourses) => [...prevCourses, ...data.courses]);
        }
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    console.log(allcoursees);
  }, [allcoursees]);

  // delete course
  const deleteCourse = async (courseId) => {
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
          `https://university-mohamed.vercel.app${routes.course._id}${routes.course.deleteCourse}?courseId=${courseId}`,
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
          // On success, update the state to remove the deleted course
          setallcourses((prevCourses) =>
            prevCourses.filter((course) => course._id !== courseId)
          );
          console.log(`Course with ID ${courseId} deleted successfully.`);
          Swal.fire({
            icon: "success",
            title: "Course Failed successfully",
            showConfirmButton: false,
            timer: 3500,
          });
        } else {
          setLoading(false);
          console.error(`Failed to delete course with ID ${courseId}.`);
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: "Course Deleted failed, please try again later",
            timer: 4500,
          });
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // update course
  const updateCourse = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.course._id}${routes.course.updateCourse}?courseId=${selectedCourseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            course_name,
            credit_hour,
            OpenForRegistration,
            desc,
            Prerequisites,
            department,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Course updated successfully",
          showConfirmButton: false,
          timer: 3500,
        });

        // Update the state with the modified course
        setallcourses((prevCourses) =>
          prevCourses.map((prevCourse) =>
            prevCourse._id === selectedCourseId
              ? {
                  ...prevCourse,
                  course_name,
                  credit_hour,
                  OpenForRegistration,
                  desc,
                  Prerequisites,
                }
              : prevCourse
          )
        );

        // Clear the selected course and reset input fields
        setSelectedCourseId(null);
        setcourse_name("");
        setdesc("");
        setOpenForRegistration("");
        setcredit_hour("");
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

  console.log(Prerequisites);

  // uplode course photo
  const uploadcourseimage = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("courseImage", courseImage);
      formData.append("courseId", courseId);

      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.course._id}${routes.course.AddCourseImg}`,
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
          title: "Course Image added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        setLoading(false);
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Course Image creation failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Upload failed", error);
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
  if (loading) {
    return <TitleAnimation />;
  }
  return (
    <>
      <div className="Create_Student">
        <h2 className="create_student">Add Course</h2>
        <marquee className="marquee" scrollamount="10">
          {" "}
          It is not possible for more than one course to have the same name
          ,course code{" "}
        </marquee>
        <form className="row mt-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Course_Name"
              aria-label="course_name"
              name="course_name"
              value={course_name}
              onChange={(e) => {
                setcourse_name(e.target.value);
              }}
            />
            <Select
              isMulti
              name="colors"
              options={allcoursees.map((course) => {
                return { value: course._id, label: course.course_name };
              })}
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option.value
                );
                setPrerequisites(selectedValues);
              }}
              className="Materials_select"
              classNamePrefix="select"
              placeholder=" Select Prerequisites"
            />

            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Description "
              aria-label="desc "
              name="desc"
              value={desc}
              onChange={(e) => {
                setdesc(e.target.value);
              }}
            />
            <input
              multiple
              type="file"
              class="form-control mt-3"
              placeholder="Enter Student Image"
              aria-label="courseImage"
              name="courseImage"
              onChange={(e) => {
                setcourseImage(e.target.files[0]);
              }}
            />
          </div>
          <div className="col part2">
            <select
              className="form-control"
              aria-label="Course_hours"
              name="credit_hour"
              value={credit_hour}
              onChange={(e) => {
                setcredit_hour(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Course Hours
              </option>
              <option value="2">2 </option>
              <option value="3">3 </option>
            </select>
            <select
              className="form-control mt-3"
              aria-label="OpenForRegistration"
              name="OpenForRegistration"
              value={OpenForRegistration}
              onChange={(e) => {
                setOpenForRegistration(e.target.value);
              }}
            >
              <option value="" disabled>
                OpenForRegistration
              </option>
              <option value="true">True </option>
              <option value="false">False</option>
            </select>
            <Select
              isMulti
              name="colors"
              options={departments.map((dep) => {
                return { value: dep.value, label: dep.title };
              })}
              onChange={(selectedOptions) => {
                const selectedLabels = selectedOptions.map(
                  (option) => option.value
                );
                setdepartment(selectedLabels);
              }}
              className="Materials_select"
              classNamePrefix="select"
              placeholder="Select Course Department "
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
                setcourseId(selectedLabels);
              }}
              className="Materials_select"
              classNamePrefix="select"
              placeholder="Select Course ID"
            />
          </div>
        </form>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={selectedCourseId ? updateCourse : createcourse}
        >
          {selectedCourseId ? "Update" : "Submit"}
        </button>
        <button
          style={{ marginLeft: "10px", width: "150px" }}
          type="button"
          className="btn btn-primary mt-3"
          onClick={uploadcourseimage}
        >
          Upload Image
        </button>

        <h2 style={{ marginBottom: "20px" }} className="col-12">
          All Courses Added
        </h2>
      </div>
      <div className="enrollcourse">
        {allcourses.map((course) => (
          <div className="course" key={course._id}>
            <p className="open-now">
              {course.OpenForRegistration === true ? "Open Now" : "Closed Now"}
            </p>{" "}
            <img src={course.images ? course.images[0].url : testImg} alt="" />
            <div className="infooo">
              <h3>{course.course_name}</h3>
              <p>4 Months</p>
            </div>
            <div className="up-del-btn">
              <button
                style={{
                  backgroundColor: "#996ae4",
                  borderColor: "#996ae4",
                }}
                onClick={() => {
                  setSelectedCourseId(course._id);
                  // Set the values of the selected course to the input fields
                  setcourse_name(course.course_name);
                  setcredit_hour(course.credit_hour);
                  setOpenForRegistration(course.OpenForRegistration);
                  setdesc(course.desc);
                }}
                type="button"
                className="btn btn-primary"
              >
                Update
              </button>
              <button
                onClick={() => deleteCourse(course._id)}
                type="button"
                className="btn btn-danger delete_btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
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
export default CreateCourse;
