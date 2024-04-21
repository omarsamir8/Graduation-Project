import { Table } from "jspdf-autotable";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { routes } from "../routes";
import { Link } from "react-router-dom";

export default function RegisteredTraining() {
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [trainingsRegistered, setTrainingsRegistered] = useState([]);
  const [trainingsResult, settrainingsResult] = useState([]);

  // get registered courses
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
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.RegisterTraining._id}${routes.RegisterTraining.deleteTraining}?trainingId=${trainingId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        if (response.ok) {
          // On success, update the state to remove the deleted course
          setTrainingsRegistered((prevTrainings) =>
            prevTrainings.filter((training) => training._id !== trainingId)
          );
          Swal.fire("Deleted!", "Your training has been deleted.", "success");
          window.location.reload();
        } else {
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
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.TrainingResult._id}${routes.TrainingResult.SearchTrainingResultByStudent}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        const data = await response.json();
        settrainingsResult(data.training);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchResultData();
  }, [accessToken, refreshToken]);
  console.log(trainingsResult);
  return (
    <>
      <div className="Create_Student">
        <h2>Training Registered</h2>
      </div>
      <div className="enrollcourse">
        {trainingsRegistered.map((registeredTraining) => (
          <div className="course">
            <div className="info">
              <p>{registeredTraining.training_name}</p>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteTraining(registeredTraining._id)}
              >
                Delete
              </button>
              <button type="button" class="btn btn-secondary">
                <Link
                  to={`/training/${registeredTraining._id}`}
                  className="link"
                >
                  More Info
                </Link>
              </button>
            </div>
            <img
              style={{ width: "100px", height: "100px" }}
              src={registeredTraining.images[0].url}
              alt=""
            />
          </div>
        ))}
      </div>
      {trainingsResult.length > 0 && (
        <>
          <h3 style={{ fontSize: "24px", color: "black", fontWeight: "bold" }}>
            Training Result
          </h3>
          <table style={{ textAlign: "center" }} className="table">
            <thead>
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">StudentID</th>
                <th scope="col">TrainingId</th>
                <th scope="col">Grade</th>
              </tr>
            </thead>
            <tbody>
              {trainingsResult.map((training, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{training.studentId}</td>
                  <td>{training.trainingId}</td>
                  <td>{training.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
