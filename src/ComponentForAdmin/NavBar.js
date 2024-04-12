import "../styles/NavBar.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useStudentContext } from "../StudentContext";
import { useDoctorContext } from "../DoctorContext";
import { useTrainingContext } from "../TrainingContext";
import { useCourseContext } from "../CourseContext";

function NavBar() {
  const [admininfo, setadmininfo] = useState([]);
  const [search_student_value, setsearch_student_value] = useState("");
  const [doctor_value, setdoctor_value] = useState("");
  const [training_value, settraining_value] = useState("");
  const [course_value, setcourse_value] = useState("");
  const [count, setcount] = useState(1);
  const { allcourses, setallcourses } = useCourseContext();
  const { allTrainings, setAllTrainings } = useTrainingContext();
  const { allstudents, setallstudents } = useStudentContext();
  const { alldoctors, setalldoctors } = useDoctorContext();
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://university-mohamed.vercel.app/Api/admin/getinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        console.log(response.data);
        setadmininfo(response.data.user);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const fetchsearch = async () => {
      try {
        // if (searchvalue.trim() !== "") {
        const response = await axios.get(
          `https://university-system-rosy.vercel.app/Api/user/searchuser?page=${count}&size=20&search=${search_student_value}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        const data = response.data;
        setallstudents(data.students);

        // Here you can update the state related to the search or perform any other actions with the data
      } catch (error) {
        // }
        console.error("Error fetching search results:", error);
      }
    };
    fetchsearch();
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        fetchsearch();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [accessToken, refreshToken, search_student_value]);

  console.log(allstudents);
  // search for doctor
  useEffect(() => {
    const fetchsearchfordoctor = async () => {
      try {
        // if (searchvalue.trim() !== "") {
        const response = await axios.get(
          `https://university-system-rosy.vercel.app/Api/instructor/search?sort=1&page=${count}&size=20&search=${doctor_value}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        const data = response.data;
        setalldoctors(data.Instructor);

        // Here you can update the state related to the search or perform any other actions with the data
      } catch (error) {
        // }
        console.error("Error fetching search results:", error);
      }
    };
    fetchsearchfordoctor();
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        fetchsearchfordoctor();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [accessToken, refreshToken, doctor_value]);

  console.log(allstudents);

  // search for training
  useEffect(() => {
    const fetchsearchfortraining = async () => {
      try {
        // if (searchvalue.trim() !== "") {
        const response = await axios.get(
          `https://university-mohamed.vercel.app/Api/training/alltraining?select=training_name&page=${count}&size=9&search=${training_value}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        const data = response.data;
        console.log(data);
        setAllTrainings(data.training);
        console.log(allTrainings);

        // Here you can update the state related to the search or perform any other actions with the data
      } catch (error) {
        // }
        console.error("Error fetching search results:", error);
      }
    };
    fetchsearchfortraining();
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        fetchsearchfortraining();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [accessToken, refreshToken, training_value]);

  // serach for course
  useEffect(() => {
    const fetchsearchforcourse = async () => {
      try {
        // if (searchvalue.trim() !== "") {
        const response = await axios.get(
          `https://university-mohamed.vercel.app/Api/courses/searchcourse?page=${count}&size=18
          &search=${training_value}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        const data = response.data;
        console.log(data);
        setallcourses(data.courses);
        console.log(allcourses);

        // Here you can update the state related to the search or perform any other actions with the data
      } catch (error) {
        // }
        console.error("Error fetching search results:", error);
      }
    };
    fetchsearchforcourse();
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        fetchsearchforcourse();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [accessToken, refreshToken, course_value]);

  // loading more
  const loadMore = () => {
    // Increment the count when loading more
    setcount((prevCount) => prevCount + 1);
  };
  return (
    <>
      <div className="nav-bar">
        <div className="search">
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              setsearch_student_value(e.target.value);
              setdoctor_value(e.target.value);
              settraining_value(e.target.value);
              setcourse_value(e.target.value);
            }}
          />
        </div>
        <div className="info">
          <img src="./assets/images/2.png" alt="" />
          <div className="details">
            <h3>{admininfo.FullName}</h3>
            <p>{admininfo.role}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
