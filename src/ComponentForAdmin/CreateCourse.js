import { useEffect, useState } from "react";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
import Swal from "sweetalert2";

function CreateCourse() {
  const [course_name, setcourse_name] = useState("");
  const [Prerequisites, setPrerequisites] = useState("");
  const [credit_hour, setcredit_hour] = useState("");
  const [instructorId, setinstructorId] = useState("");
  const [OpenForRegistration, setOpenForRegistration] = useState("");
  const [desc, setdesc] = useState("");
  const [allcourses, setallcourses] = useState([]);

  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // create course
  const createcourse = async () => {
    try {
      const response = await fetch(
        "https://university-lyart.vercel.app/Api/courses/addcourse",
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
          title: "Course added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Course creation failed, please try again later",
          timer: 4500,
        });

        // Reset the form or perform any other actions on error
        // Reset the Materials array
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // get all Courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://university-lyart.vercel.app/Api/courses/searchcourse?size=5",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = await response.json();
        setallcourses(data.course);
        console.log(data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    console.log(allcourses);
  }, [allcourses]);

  // delete course
  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(
        `https://university-lyart.vercel.app/Api/courses/deletecourse?courseId=${courseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );

      if (response.ok) {
        // عند النجاح، يمكنك إعادة تحميل الكورسات أو تحديث الحالة بطريقة أخرى
        setallcourses((prevCourses) =>
          prevCourses.filter((course) => course._id !== courseId)
        );
        console.log(`Course with ID ${courseId} deleted successfully.`);
      } else {
        console.error(`Failed to delete course with ID ${courseId}.`);
      }
      // أو أي عمليات أخرى ترغب في تنفيذها بعد حذف الكورس
      // } else {
      //   // إذا كان هناك خطأ في الحذف، يمكنك إظهار رسالة خطأ
      //   console.error("Failed to delete course");
      // }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <>
      <div className="Create_Student">
        <h2 className="create_student">Add Course</h2>
        <form class="row mt-4">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Course_Name"
              aria-label="course_name"
              name="course_name"
              onChange={(e) => {
                setcourse_name(e.target.value);
              }}
            />

            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter Prerequisites"
              aria-label="Prerequisites"
              name="Prerequisites"
              onChange={(e) => {
                setPrerequisites(e.target.value);
              }}
            />
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter Description "
              aria-label="desc "
              name="desc"
              onChange={(e) => {
                setdesc(e.target.value);
              }}
            />
          </div>
          <div class="col part2">
            <input
              type="email"
              class="form-control"
              placeholder="Enter Course_hours"
              aria-label="Course_hours"
              name="credit_hour"
              onChange={(e) => {
                setcredit_hour(e.target.value);
              }}
            />
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter instructorId "
              aria-label="instructorId "
              name="instructorId"
              onChange={(e) => {
                setinstructorId(e.target.value);
              }}
            />{" "}
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter OpenForRegistration"
              aria-label="OpenForRegistration"
              name="OpenForRegistration "
              onChange={(e) => {
                setOpenForRegistration(e.target.value);
              }}
            />
          </div>
        </form>
        <button
          type="button"
          class="btn btn-primary mt-3"
          onClick={createcourse}
        >
          Submit
        </button>
        <h2 className="col-12">All Courses Added</h2>
      </div>
      <div className="enrollcourse">
        {allcourses.map((course) => {
          return (
            <div className="course">
              <div className="info">
                <p>
                  course name= {course.course_name}, total hour=
                  {course.credit_hour}
                </p>

                <div className="img"></div>
                <div className="up-del-btn">
                  <button type="button" className="btn btn-primary">
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
            </div>
          );
        })}
      </div>
    </>
  );
}
export default CreateCourse;
