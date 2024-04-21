import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { routes } from "../routes";
import { Link } from "react-router-dom";
import defulatimg from "../assets/oop.png";

export default function RegisterForTraining() {
  const [alltrainingsAvailable, setalltrainingsAvailable] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [training, setTraining] = useState(null);
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
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
    console.log("startdate :", startdate);
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
            <div className="course" key={training._id}>
              <div className="info">
                <p>{training.training_name}</p>
                <p style={{ marginTop: "-20px", color: "gray" }}>
                  Start Date:{" "}
                  {new Date(training.start_date).toLocaleDateString()}
                </p>
                <p style={{ marginTop: "-20px", color: "gray" }}>
                  End Date: {new Date(training.end_date).toLocaleDateString()}
                </p>

                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => RegisterForTraining(training._id)}
                >
                  Register
                </button>
                <button type="button" class="btn btn-secondary">
                  <Link to={`/training/${training._id}`} className="link">
                    More Info
                  </Link>
                </button>
              </div>
              {training && training.images && training.images.length > 0 ? (
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={training.images[0].url}
                  alt=""
                />
              ) : (
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={defulatimg}
                  alt=""
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import Swal from 'sweetalert2'
// import { routes } from '../routes'

// const RegisterForTraining = () => {
//   const [alltrainingsAvailable, setalltrainingsAvailable] = useState([])

//   const accessToken = localStorage.getItem('accesstoken')
//   const refreshToken = localStorage.getItem('refreshtoken')
//   // const usenavigate = useNavigate();
//   // usenavigate(`/training/${trainingId}`);

//   //   // Register for training
//   const RegisterForTraining = async () => {
//     try {
//       const response = await fetch(
//         `https://university-mohamed.vercel.app${routes.RegisterTraining._id}${routes.RegisterTraining.addTraining}?trainingId`,
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'refresh-token': refreshToken
//           }
//         }
//       )

//       if (response.ok) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Course registered successfully',
//           showConfirmButton: false,
//           timer: 3500
//         })
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Failed',
//           text: 'It is not allowed for you to register this training',
//           timer: 4500
//         })
//       }
//     } catch (error) {
//       console.error('Register Failed', error)
//     }
//   }
//   // Fetch all Trainings
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://university-mohamed.vercel.app${routes.Training._id}${routes.Training.allTrainingBystudent}?page=1&size=20`,
//           {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               'refresh-token': refreshToken
//             }
//           }
//         )
//         const data = await response.json()
//         setalltrainingsAvailable(data.trainings)
//         console.log(data)
//       } catch (error) {
//         console.error('Fetch failed', error)
//       }
//     }

//     fetchData()
//   }, [accessToken, refreshToken])

//   return (
//     <>
//       <div className='Create_Student'>
//         <h2>All Trainings Available</h2>
//       </div>
//       <div className='enrollcourse'>
//         {alltrainingsAvailable.map((training) => (
//           <div className='course' key={training._id}>
//             <div className='info'>
//               <p>{training.training_name}</p>
//               <button
//                 type='button'
//                 className='btn btn-primary'
//                 onClick={() => RegisterForTraining(training._id)}
//               >
//                 Register
//               </button>
//               <Link
//                 to={`/trainingInfo`}
//                 className='btn btn-primary'
//               >
//                 Details
//               </Link>
//             </div>
//             <div className='img' />
//           </div>
//         ))}
//       </div>
//     </>
//   )
// }

// export default RegisterForTraining
