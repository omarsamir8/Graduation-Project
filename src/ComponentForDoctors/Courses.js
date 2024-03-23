import { NavLink } from "react-router-dom";
import { $Dashboard2_Components } from "../Atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";

function Courses() {
  const [selectedComponent2, setSelectedComponent2] = useRecoilState(
    $Dashboard2_Components
  );
  const [allstudentregistercourses, setallstudentregistercourses] = useState(
    []
  );
  const [doctorMatarials, setdoctorMatarials] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // Function to get students registered in a course
  const fetchRegisteredStudents = async (courseId) => {
    try {
      const response = await axios.get(
        `https://university-mohamed.vercel.app/Api/student/register/searchRegister?=courseId=${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response.data);
      setallstudentregistercourses(response.data);
    } catch (error) {
      console.error("Error fetching registered students:", error);
    }
  };

  // get doctor materials
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://university-mohamed.vercel.app/Api/instructor/getinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setdoctorMatarials(response.data.user.Materials);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  return (
    <>
      <div className="enrollcourse">
        {doctorMatarials.map((material) => {
          return (
            <div className="course" key={material.course_id}>
              <div className="info">
                <p>{material.course_name}</p>
                <NavLink
                  onClick={() => fetchRegisteredStudents(material.course_id)}
                  style={{ textDecoration: "none" }}
                  className="NavLink"
                >
                  <button type="button" className="btn btn-primary">
                    Students
                  </button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Courses;
