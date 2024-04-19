// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { routes } from "../../routes";
// const TrainingDetails = () => {
//   const { trainingId } = useParams(); // Get training ID from URL parameter
//   const [trainingData, setTrainingData] = useState([]); // Initialize trainingData state with null
//   const accessToken = localStorage.getItem("accesstoken");
//   const refreshToken = localStorage.getItem("refreshtoken");

//   // Fetch training Info
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://university-mohamed.vercel.app${routes.Training._id}${routes.Training.singleTraininginfoBystudent}?trainingId=661892da363994b24ccab824`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "refresh-token": refreshToken,
//             },
//           }
//         );

//         const data = await response.json();
//         console.log(data);
//         setTrainingData(data.training);
//       } catch (error) {
//         console.error("Fetch failed", error);
//       }
//     };

//     fetchData();
//   }, [accessToken, refreshToken]);

//   return (
//     <div className="enrollcourse">
//     {trainingData.map((training) => (
//       <div className="course" key={training._id}>
//         <div className="info">
//           <p>{training.training_name}</p>
//         </div>
//       </div>
//     ))}
//   </div>
//   )
//     }

// export default TrainingDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { routes } from "../../routes";

const TrainingDetails = () => {
  const { trainingId } = useParams(); // Get training ID from URL parameter
  const [trainingData, setTrainingData] = useState({}); // Initialize trainingData state with null
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // Fetch training Info
  useEffect(
    (trainingId) => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://university-mohamed.vercel.app${routes.Training._id}${routes.Training.singleTraininginfoBystudent}?trainingId=661892da363994b24ccab824`,
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
          setTrainingData(data);
        } catch (error) {
          console.error("Fetch failed", error);
        }
      };

      fetchData();
    },
    [accessToken, refreshToken]
  );

  return (
    <div className="enrollcourse">
      <div className="course">
        <div className="info">
          <h1>Hello</h1>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetails;
