import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { routes } from "../routes";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap"; // Assuming you are using react-bootstrap
import TitleAnimation from "../Loader/TitleAnimation";

export default function RegisteredTraining() {
  const [trainingsRegistered, setTrainingsRegistered] = useState([]);
  const [trainingsResult, setTrainingsResult] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [loading, setLoading] = useState(false);

  // get registered training
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app/Api/Trainings/Registers/get/trainings/registerd/info/to/student`,
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
        if (data.result && data.result[0]) {
          setTrainingsRegistered(data.result[0].trainingRegisterd || []);
        }
        if (response.ok) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  console.log(trainingsRegistered);
  console.log(trainingsRegistered.length);

  // delete Training Register
  const deleteTraining = async (trainingId) => {
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
          `https://university-mohamed.vercel.app${routes.RegisterTraining.deleteTraining}?trainingId=${trainingId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        if (response.ok) {
          setLoading(false);
          // On success, update the state to remove the deleted course
          setTrainingsRegistered((prevTrainings) =>
            prevTrainings.filter((training) => training._id !== trainingId)
          );
          Swal.fire("Deleted!", "Your training has been deleted.", "success");
        } else {
          setLoading(false);
          Swal.fire("Failed!", "Failed to delete training.", "error");
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
      Swal.fire("Error!", "Failed to delete training.", "error");
    }
  };

  // get training result
  useEffect(() => {
    const fetchResultData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app/Api/Trainings/Results/search/trainings/result/by/student?select=trainingId,studentId,grade`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setTrainingsResult(data.training || []);
        if (response.ok) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchResultData();
  }, [accessToken, refreshToken]);
  console.log(trainingsResult);
  if (loading) {
    return <TitleAnimation />;
  }
  return (
    <>
      {trainingsRegistered.length > 0 && (
        <div className="Create_Student">
          <h2>Training Registered</h2>
        </div>
      )}
      <div className="enrollcourse">
        {trainingsRegistered.map((registeredTraining) => (
          <div
            style={{ height: "420px" }}
            className="course"
            key={registeredTraining._id}
          >
            <p className="open-now">Open Now</p>
            <img
              src={
                registeredTraining.images
                  ? registeredTraining.images[0].url
                  : null
              }
              alt=""
            />
            <div className="info">
              <h3>{registeredTraining.training_name}</h3>
              <p style={{ marginTop: "-20px", color: "gray" }}>
                Start Date:{" "}
                {new Date(registeredTraining.start_date).toLocaleDateString()}
              </p>
              <p style={{ marginTop: "-20px", color: "gray" }}>
                End Date:{" "}
                {new Date(registeredTraining.end_date).toLocaleDateString()}
              </p>
            </div>
            <div className="up-del-btn">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteTraining(registeredTraining._id)}
              >
                Delete
              </button>
              <button
                style={{
                  backgroundColor: "#996ae4",
                  borderColor: "#996ae4",
                }}
                type="button"
                className="btn btn-secondary"
              >
                <Link
                  to={`/training/${registeredTraining._id}`}
                  className="link"
                >
                  More Info
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      {trainingsResult.length > 0 && (
        <>
          <h3
            style={{
              fontSize: "24px",
              color: "black",
              fontWeight: "bold",
              marginTop: "5px",
            }}
          >
            Training Result
          </h3>
          <Table
            striped
            bordered
            hover
            style={{ textAlign: "center" }}
            className="table"
          >
            <thead>
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Student Name</th>
                <th scope="col">Training Name</th>
                <th scope="col">Grade</th>
              </tr>
            </thead>
            <tbody>
              {trainingsResult.map((training, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{training.studentId.Full_Name}</td>
                  <td>{training.trainingId.training_name}</td>
                  <td>{training.grade}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}
