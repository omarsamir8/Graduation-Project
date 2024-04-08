import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function RegisteredTraining() {
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [trainingsRegistered, setTrainingsRegistered] = useState([]);

  // get registered courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app/Api/Register/Training/getTrainingInfo`,
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
          `https://university-mohamed.vercel.app/Api/Register/Training/deleteTraining?trainingId=${trainingId}`,
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

  return (
    <>
      <div className="Create_Student">
        <h2>Training Registered</h2>
      </div>
      <div className="enrollcourse">
        {trainingsRegistered.map((registeredTraining) => (
          <div className="course">
            <div className="info">
              {/* <p>{registeredTraining.trainingId.training_name}</p> */}
              <button
                type="button"
                className="btn btn-danger"
                onClick={() =>
                  deleteTraining(registeredTraining.trainingId._id)
                }
              >
                Delete
              </button>
            </div>
            <div className="img"></div>
          </div>
        ))}
      </div>
    </>
  );
}
