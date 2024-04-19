import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { routes } from "../../routes";

const TrainingDetails = () => {
  const { trainingId } = useParams(); // Get training ID from URL parameter
  const [trainingData, settrainingData] = useState({}); // Initialize trainingData state with null
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // Fetch training Info
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://university-mohamed.vercel.app${routes.Training._id}${routes.Training.singleTraininginfoBystudent}?trainingId=${trainingId}`,
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
          settrainingData(data);
        } catch (error) {
          console.error("Fetch failed", error);
        }
      };

      fetchData();
    },
    [trainingId,accessToken, refreshToken]
  );

  return (
    <div className="enrollcourse">
      <div className="course">
        <div className="info">
          <h1>Hello</h1>
      <p>{trainingData.training.training_name}</p>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetails;

