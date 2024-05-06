import { useParams } from "react-router-dom";
import Background from "../../../src/assets/55.jpg";
import profile_info from "../../../src/poster1.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
function DoctorInfo() {
  const { doctorId } = useParams();
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [doctorInfo, setdoctorInfo] = useState([]);
  const [semesterinfo, setsemesterinfo] = useState([]);
  const [doctormatarial, setdoctormatarial] = useState([]);
  const [doctorTraining, setdoctorTraining] = useState([]);
  // get Doctor information
  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app/Api/instructors/get/info/by/admin?InstructorId=${doctorId}
          `,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setdoctorInfo(response.data.user);
        setdoctormatarial(response.data.user.Materials);
        setdoctorTraining(response.data.user.Training);
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchStudentInfo();
  }, [accessToken, refreshToken]);
  console.log(doctorInfo);
  console.log(doctormatarial);

  //   get main semester info
  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app/Api/semsters/get/main/semster/Info/by/admin
          `,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setsemesterinfo(response.data.semster);
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchStudentInfo();
  }, [accessToken, refreshToken]);
  return (
    <>
      <div className="studentInfoPage col-12">
        <div className="col-12 backgroundImg_info">
          <img src={Background} alt="Not found" className="studentInfo" />
          <div className="profile_info">
            <img
              src={doctorInfo.urlImg ? doctorInfo.urlImg : profile_info}
              className="profile_photo"
              alt=""
            />
          </div>
          <div className="infoo">
            <h4>{doctorInfo.FullName}</h4>

            <h5 style={{ marginTop: "-5px" }}>
              Department : {doctorInfo.department}
            </h5>
          </div>
        </div>
        <div className="single-details">
          <div className="det">
            <div className="single-det col-12">
              <h5>
                Name : <span>{doctorInfo.FullName}</span>
              </h5>
            </div>
            <div className="single-det">
              <h5>
                Email : <span>{doctorInfo.email}</span>
              </h5>
            </div>
            <div className="single-det">
              <h5>
                National ID :<span>{doctorInfo.National_Id}</span>{" "}
              </h5>
            </div>
            <div className="single-det">
              <h5>
                Phone Number : <span>{doctorInfo.phone}</span>
              </h5>
            </div>
            <div className="single-det">
              <h5>
                Birth Date :{" "}
                <span>
                  {" "}
                  {new Date(doctorInfo.Date_of_Birth).toLocaleDateString()}
                </span>
              </h5>
            </div>
          </div>
          <div className="det">
            <div className="single-det">
              <h5>
                Term : <span>{semesterinfo.term}</span>
              </h5>
            </div>
            <div className="single-det">
              <h5>
                Academic Year :<span>{semesterinfo.year}</span>
              </h5>
            </div>
            <div className="single-det">
              <h5>
                Role : <span>{doctorInfo.role}</span>
              </h5>
            </div>
            <div className="single-det">
              <h5>
                Gender :<span> {doctorInfo.gender}</span>
              </h5>
            </div>
            <div className="single-det">
              <h5>
                Department : <span>{doctorInfo.department}</span>
              </h5>
            </div>
          </div>
          <div className="det">
            <h4>Doctor Matarial</h4>
            <Table striped bordered hover size="md" className="col-12">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Course Name</th>
                  <th>Number Of Hours</th>
                </tr>
              </thead>
              <tbody>
                {doctormatarial.map((course, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{course.course_name}</td>
                      <td>{course.credit_hour}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className="det">
            <h4>Doctor Training</h4>
            <Table striped bordered hover size="md" className="col-12">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Training Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {doctorTraining.map((training, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{training.training_name} </td>
                      <td>
                        {new Date(training.start_date).toLocaleDateString()}{" "}
                      </td>
                      <td>
                        {new Date(training.end_date).toLocaleDateString()}{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
export default DoctorInfo;
