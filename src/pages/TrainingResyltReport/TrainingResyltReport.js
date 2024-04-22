import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import banhaimg1 from "../../assets/banha.jpeg";
import banhaimg2 from "../../assets/benha.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { routes } from "../../routes";
export default function TrainingResyltReport() {
  const { trainingId } = useParams();
  const [studentResultReport, setStudentResultReport] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const usenavigate = useNavigate();
  const NavigateToDoctor = () => {
    usenavigate("/doctor");
  };
  useEffect(() => {
    const fetchResultData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app/Api/Trainings/Results/get/single/training/result/by/instructor?TrainingResultId=66147a61605a1d8e907b3aab`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);

        setStudentResultReport(response.data || []);
      } catch (error) {
        console.error("Error fetching student result:", error);
      }
    };
    fetchResultData();
  }, [trainingId,accessToken, refreshToken]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {" "}
        <img src={banhaimg1} alt="" className="Benha_img" />
        <img src={banhaimg2} alt="" className="BFCAI_img" />
      </div>

      {/* <div style={{ marginTop: "4rem" }} className="get_all_student">
        <h2
          style={{ marginLeft: ".7rem", textAlign: "center", color: "brown" }}
        >
          Report Of Results
        </h2>

        <Table
          style={{ marginTop: "5rem" }}
          striped
          bordered
          hover
          size="md"
          className="col-12"
        >
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Student Name</th>
              <th scope="col">Course Name</th>
              <th scope="col">YearWorks</th>
              <th scope="col">Practical</th>
              <th scope="col">FinalExam</th>
              <th scope="col">TotalGrate</th>
            </tr>
          </thead>
          <tbody>
            {studentResultReport.map((results, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{results.studentId.Full_Name}</td>
                  <td>{results.courseId.course_name}</td>
                  <td>{results.YearWorks}</td>
                  <td>{results.Practical}</td>
                  <td>{results.FinalExam}</td>
                  <td>{results.TotalGrate}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="col-12 BackToStu_report">
          <Button className="BackToStuBtn" onClick={NavigateToDoctor}>
            Back
          </Button>
          <Button className="Print_semester" onClick={window.print}>
            Print
          </Button>
        </div>
      </div> */}
    </>
  );
}
