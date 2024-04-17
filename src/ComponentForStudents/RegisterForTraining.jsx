import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { routes } from "../routes";

export default function RegisterForTraining() {
  const [alltrainingsAvailable, setalltrainingsAvailable] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  // Register for training
  const RegisterForTraining = async (tainingId) => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.RegisterTraining._id}${routes.RegisterTraining.addTraining}?trainingId=${tainingId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Course registered successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "It is not allowed for you to register this training",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Register Failed", error);
    }
  };
  // Fetch all Trainings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.Training._id}${routes.Training.allTrainingBystudent}?page=1&size=20`,
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
  return (
    <>
      <div className="Create_Student">
        <h2>All Trainings Available</h2>
      </div>
      <div className="enrollcourse">
        {alltrainingsAvailable.map((training) => {
          return (
            <div className="course">
              <div className="info">
                <p>{training.training_name}</p>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => RegisterForTraining(training._id)}
                >
                  Register
                </button>
              </div>
              <div className="img"></div>
            </div>
          );
        })}
      </div>
    </>
  );
}
