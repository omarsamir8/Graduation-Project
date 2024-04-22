// import { Table } from "jspdf-autotable";
// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { routes } from "../routes";
// import { Link } from "react-router-dom";

// export default function RegisteredTraining() {
//   const accessToken = localStorage.getItem("accesstoken");
//   const refreshToken = localStorage.getItem("refreshtoken");
//   const [trainingsRegistered, setTrainingsRegistered] = useState([]);
//   const [trainingsResult, settrainingsResult] = useState([]);

//   // get registered training
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://university-mohamed.vercel.app${routes.RegisterTraining._id}${routes.RegisterTraining.getTrainingRegisterdInfoTostu}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "refresh-token": refreshToken,
//             },
//           }
//         );
//         const data = await response.json();
//         setTrainingsRegistered(data.result.trainingRegisterd);
//       } catch (error) {
//         console.error("Fetch failed", error);
//       }
//     };

//     fetchData();
//   }, [accessToken, refreshToken]);
//   console.log(trainingsRegistered);
//   // delete Training Register
//   const deleteTraining = async (trainingId) => {
//     try {
//       const confirmed = await Swal.fire({
//         title: "Are you sure?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#d33",
//         cancelButtonColor: "#3085d6",
//         confirmButtonText: "Yes, delete it!",
//       });

//       if (confirmed.isConfirmed) {
//         const response = await fetch(
//           `https://university-mohamed.vercel.app${routes.RegisterTraining._id}${routes.RegisterTraining.deleteTraining}?trainingId=${trainingId}`,
//           {
//             method: "PATCH",
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "refresh-token": refreshToken,
//             },
//           }
//         );

//         if (response.ok) {
//           // On success, update the state to remove the deleted course
//           setTrainingsRegistered((prevTrainings) =>
//             prevTrainings.filter((training) => training._id !== trainingId)
//           );
//           Swal.fire("Deleted!", "Your training has been deleted.", "success");
//           window.location.reload();
//         } else {
//           Swal.fire("Failed!", "Failed to delete training.", "error");
//         }
//       }
//     } catch (error) {
//       console.error("Delete failed", error);
//       Swal.fire("Error!", "Failed to delete training.", "error");
//     }
//   };

//   // get training result
//   useEffect(() => {
//     const fetchResultData = async () => {
//       try {
//         const response = await fetch(
//           `https://university-mohamed.vercel.app/Api/Trainings/Results/search/trainings/result/by/student?select=trainingId,studentId,grade`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "refresh-token": refreshToken,
//             },
//           }
//         );
//         const data = await response.json();
//         settrainingsResult(data.training);
//       } catch (error) {
//         console.error("Fetch failed", error);
//       }
//     };

//     fetchResultData();
//   }, [accessToken, refreshToken]);
//   console.log(trainingsResult);
//   return (
//     <>
//       {" "}
//       {trainingsRegistered.length > 0 && (
//         <>
//           {" "}
//           <div className="Create_Student">
//             <h2>Training Registered</h2>{" "}
//           </div>
//         </>
//       )}
//       <div className="enrollcourse">
//         {trainingsRegistered.map((registeredTraining) => (
//           <div className="course">
//             <div className="info">
//               <p>{registeredTraining.training_name}</p>
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={() => deleteTraining(registeredTraining._id)}
//               >
//                 Delete
//               </button>
//               <button type="button" class="btn btn-secondary">
//                 <Link
//                   to={`/training/${registeredTraining._id}`}
//                   className="link"
//                 >
//                   More Info
//                 </Link>
//               </button>
//             </div>
//             <img
//               style={{ width: "100px", height: "100px" }}
//               src={registeredTraining.images[0].url}
//               alt=""
//             />
//           </div>
//         ))}
//       </div>
//       {trainingsResult.length > 0 && (
//         <>
//           <h3
//             style={{
//               fontSize: "24px",
//               color: "black",
//               fontWeight: "bold",
//               marginTop: "5px",
//             }}
//           >
//             Training Result
//           </h3>
//           <Table style={{ textAlign: "center" }} className="table">
//             <thead>
//               <tr>
//                 <th scope="col">#ID</th>
//                 <th scope="col">Student Name</th>
//                 <th scope="col">Training Name</th>
//                 <th scope="col">Grade</th>
//               </tr>
//             </thead>
//             <tbody>
//               {trainingsResult.map((training, index) => (
//                 <tr key={index}>
//                   <th scope="row">{index + 1}</th>
//                   <td>{training.studentId.Full_Name}</td>
//                   <td>{training.trainingId.training_name}</td>
//                   <td>{training.grade}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </>
//        )}
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import { Table } from "jspdf-autotable";
import Swal from "sweetalert2";
import { routes } from "../routes";
import { Link } from "react-router-dom";

export default function RegisteredTraining() {
 
  const [trainingsRegistered, setTrainingsRegistered] = useState([]);
  const [trainingsResult, setTrainingsResult] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  // get registered training
  useEffect(() => {
    const fetchData = async () => {
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
        setTrainingsRegistered(data.result.trainingRegisterd);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

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
          // On success, update the state to remove the deleted course
          setTrainingsRegistered((prevTrainings) =>
            prevTrainings.filter((training) => training._id !== trainingId)
          );
          Swal.fire("Deleted!", "Your training has been deleted.", "success");
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
  // useEffect(() => {
  //   const fetchResultData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://university-mohamed.vercel.app/Api/Trainings/Results/search/trainings/result/by/student?select=trainingId,studentId`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             "refresh-token": refreshToken,
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       setTrainingsResult(data.training);
  //     } catch (error) {
  //       console.error("Fetch failed", error);
  //     }
  //   };

  //   fetchResultData();
  // }, [accessToken, refreshToken]);

  return (
    <>
      {trainingsRegistered.length > 0 && (
        <div className="Create_Student">
          <h2>Training Registered</h2>
        </div>
      )}
      <div className="enrollcourse">
        {trainingsRegistered.map((registeredTraining) => (
          <div className="course" key={registeredTraining._id}>
            <div className="info">
              <p>{registeredTraining.training_name}</p>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteTraining(registeredTraining._id)}
              >
                Delete
              </button>
              <button type="button" className="btn btn-secondary">
                <Link to={`/training/${registeredTraining._id}`} className="link">
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
          <Table style={{ textAlign: "center" }} className="table">
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

