import React, { useEffect, useState } from "react";

export default function RegisteredTraining() {
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [trainingsregisterd, settrainingsregisterd] = useState([]);
  // get registerd courses
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
        console.log(data);
        settrainingsregisterd(data.result.trainingRegisterd);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  // console.log(trainingsregisterd);

  // delete Training Register
  const deleteTraining = async (trainingId) => {
    try {
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
        settrainingsregisterd((prevTrainings) =>
          prevTrainings.filter((training) => training._id !== trainingId)
        );
        console.log(`Training with ID ${trainingId} deleted successfully.`);
      } else {
        console.error(`Failed to delete training with ID ${trainingId}.`);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  return (
    <>
      <div className="Create_Student">
        <h2>Training Registered</h2>
      </div>
      <div className="enrollcourse">
        {trainingsregisterd.map((RegisteredTraining) => {
          return (
            <div className="course">
              <div className="info">
                <p>{RegisteredTraining.trainingId.training_name}</p>
                <button
                  style={{ background: "red", borderColor: "red" }}
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    deleteTraining(RegisteredTraining.trainingId._id);
                  }}
                >
                  Delete
                </button>
              </div>
              <div className="img "></div>
            </div>
          );
        })}
      </div>
    </>
  );
}
