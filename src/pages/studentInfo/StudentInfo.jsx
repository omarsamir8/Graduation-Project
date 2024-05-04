import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Background from "../../../src/Student_Info.png";
import profile_info from "../../../src/poster1.jpg";
import "./StudentInfo.scss";
import { useStudentContext } from "../../StudentContext";
import axios from "axios";
import { routes } from "../../routes";

export default function StudentInfo() {
  const { StudentInfo } = useParams();

  const { allstudents, setallstudents } = useStudentContext();
  const [studentInfo, setStudentInfo] = useState([]);
  const [studentnewspaper, setstudentnewspaper] = useState([]);
  const [totalgpa, settotalgpa] = useState("");
  const [totalhour, settotalhour] = useState("");
  const [level, setlevel] = useState("");
  const [trainingsRegistered, setTrainingsRegistered] = useState([]);
  const [coursesregisterd, setcoursesregisterd] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // Find the student with the matching StudentInfo parameter
  const selectedStudent = allstudents.find(
    (student) => student.StudentInfo === StudentInfo
  );

 
  
 

// All about student(Newspaper)
  useEffect(() => {
    const fetchSemesterGrade = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.studentGrades._id}${routes.studentGrades.NewspaperBystudent}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setstudentnewspaper(response.data.semesters);
        settotalgpa(response.data.totalGpaOverall);
        settotalhour(response.data.totalCreditHours);
        setlevel(response.data.level);

        // Log the updated state
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchSemesterGrade();
  }, [accessToken, refreshToken]);
  console.log(studentnewspaper);

  // Dashboard

   useEffect(() => {
    const fetchSemesterGrade = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.studentGrades._id}${routes.studentGrades.NewspaperBystudent}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setstudentnewspaper(response.data.semesters);
        settotalgpa(response.data.totalGpaOverall);
        settotalhour(response.data.totalCreditHours);
        setlevel(response.data.level);

        // Log the updated state
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchSemesterGrade();
  }, [accessToken, refreshToken]);
  console.log(studentnewspaper);

  // get total training registered
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.RegisterTraining._id}${routes.RegisterTraining.getTrainingRegisterdInfoTostu}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        const data = await response.json();
        setTrainingsRegistered(data.result.trainingRegisterd);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  console.log(trainingsRegistered);

  // get registerd courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.courseRegister._id}${routes.courseRegister.GetRegisterInfoByAdmin}?studentId=${StudentInfo._id}`,
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
        setcoursesregisterd(data.register.coursesRegisterd);
        console.log(coursesregisterd);
        console.log(studentInfo)
      
        
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken,StudentInfo]);

  return (
    <>
      <div className="studentInfoPage col-12">
        <div className="col-12 backgroundImg_info">
          <img src={Background} alt="Not found" className="studentInfo" />
          <div className="profile_info">
            <img src={profile_info} className="profile_photo" />
          </div>
          <div className="info">
            {selectedStudent && (
              <>
                <h5>{selectedStudent.Full_Name}</h5>
                <p> {selectedStudent.Student_Code}</p>
                <p>Level {level}</p>
              </>
            )}
          </div>
        </div>

        <div className="col-12 all_about_student">
          <div className="registered_courses_info col-4">
    <div className="col-5 info_dash">
    <i class="fa-solid fa-book-open" />
      <h6 className="col-12">Total courses</h6>
      <p>{coursesregisterd.length}</p>
    </div>
    <div className="col-5 info_dash">
    <i class="fa-brands fa-stack-overflow" />
    <h6 className="col-12">Total trainings</h6>
      <p>{trainingsRegistered.length}</p>
    </div>
    <div className="col-5 info_dash">
    <i class="fa-solid fa-layer-group" />
    <h6 className="col-12">Total semesters</h6>
      <p>{studentnewspaper.length}</p>
    </div>
    <div className="col-5 info_dash">
    <i class="fa-solid fa-clock" />
    <h6 className="col-12">Total hours</h6>
      <p>{totalhour}</p>
    </div>
    <div className="col-5 info_dash">
    <i class="fa-brands fa-dribbble" />
    <h6 className="col-12">Total gpa</h6>
      <p>{totalgpa}</p>
    </div>
          </div>
          <div className="registered_trainings_info col-4"></div>
        </div>
      </div>
    </>
  );
}
