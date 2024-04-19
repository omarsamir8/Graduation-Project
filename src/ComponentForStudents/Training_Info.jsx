import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { routes } from "../routes";

const Training_Info = () => {
    const { trainingId } = useParams();
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [alltrainingsAvailable, setalltrainingsAvailable] = useState([]);
  const [training, setTraining] = useState(null);

  const RegisterForTraining = async (trainingId) => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.RegisterTraining._id}${routes.RegisterTraining.addTraining}?trainingId=${trainingId}`,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
            `https://university-mohamed.vercel.app${routes.Training._id}${routes.Training.allTrainingBystudent}?page=1&size=20`, // Corrected URL for fetching training by ID
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        const data = await response.json();
        setTraining(data); // Set the fetched training data
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [ accessToken, refreshToken]);
  const Training = alltrainingsAvailable.find((training) => training._id == trainingId);
  return (
    // <div>
    //   <div className="enrollcourse">
    //     <div className="course" key={training._id}>
    //       <div className="info">
    //         <p>{training.training_name}</p>
    //         <button
    //           type="button"
    //           className="btn btn-primary"
    //           onClick={() => RegisterForTraining(training._id)}
    //         >
    //           Register
    //         </button>
    //       </div>
    //       <div className="img"></div>
    //     </div>
    //   </div>
    // </div>
    <div key={training._id}>
        <h1>Hello Info</h1>
    </div>
    
  );
};

export default Training_Info;
