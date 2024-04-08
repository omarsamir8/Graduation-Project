// import { NavLink } from "react-router-dom";
// import { $Dashboard2_Components } from "../Atoms";
// import { useRecoilState } from "recoil";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// function Training() {
//   const [selectedComponent2, setSelectedComponent2] = useRecoilState(
//     $Dashboard2_Components
//   );
//   const accessToken = localStorage.getItem("accesstoken");
//   const refreshToken = localStorage.getItem("refreshtoken");
//   const [doctorTrainings, setdoctorTrainings] = useState([]);
//   // get doctor trainings
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://university-mohamed.vercel.app/Api/instructor/getinfo",
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "refresh-token": refreshToken,
//             },
//           }
//         );
//         console.log(response.data);
  
//         setdoctorTrainings(response.data.user.Training);
  
//         if (response.status === 200) {
//           // Show SweetAlert on success
//           Swal.fire({
//             icon: "success",
//             title: "Training fetched successfully",
//             showConfirmButton: false,
//             timer: 3500,
//           });
//         } else {
//           // Show an error message if needed
//           Swal.fire({
//             icon: "error",
//             title: "Fail",
//             text: "Failed to fetch training",
//             timer: 4500,
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching doctor info:", error);
//       }
//     };
  
//     fetchData();
//   }, [accessToken, refreshToken, setSelectedComponent2]); // Add setSelectedComponent2 to the dependency array
//    // Add setSelectedComponent2 to the dependency array
// console.log(doctorTrainings)  
//   return (
//     <>
//       <div className="enrollcourse">
//         {doctorTrainings.map((training) => {
//           return (
//             <div className="course" key={training._id}>
//               <div className="info">
//                 <p>{training.training_name}</p>
//                 <NavLink
//                   onClick={() => setSelectedComponent2("StudentRegTraining")}
//                   style={{ textDecoration: "none" }}
//                   className="NavLink"
//                 >
//                   <button type="button" class="btn btn-primary">
//                     Students
//                   </button>
//                 </NavLink>
//               </div>
//               <div className="img "></div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="get_all_student">
//         <h2> All Students Reg Training </h2>
//         <table style={{ textAlign: "center" }} class="table">
//           <thead>
//             <tr>
//               <th scope="col">#ID</th>
//               <th scope="col">FullName</th>
//               <th scope="col">Training_code</th>
//               <th scope="col">Phone</th>
//               <th scope="col">Level</th>
//               <th scope="col">Training_Id</th>
//               <th scope="col">Training_Grade</th>
//               <th scope="col">Submit</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th scope="row">1</th>
//               <td>Ahmed Adel</td>
//               <td>2132515155</td>
//               <td>01558849371</td>
//               <td>Four</td>
//               <td>#xxc01230 </td>

//               <td>
//                 {" "}
//                 <input
//                   style={{
//                     width: "150px",
//                     alignItems: "center",
//                     height: "25px",
//                   }}
//                   type="text"
//                   class="form-control"
//                   placeholder="Student Grade"
//                   aria-label="Student Grade"
//                   name="Student_Grade"
//                 />
//               </td>
//               <td>
//                 <button
//                   type="submit"
//                   style={{
//                     height: "25px",
//                     border: "none",
//                     borderRadius: "5px",
//                     backgroundColor: "#996ae4",
//                   }}
//                 >
//                   Upload
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }
// export default Training;



import { NavLink } from "react-router-dom";
import { $Dashboard2_Components } from "../Atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Training() {
  const [selectedComponent2, setSelectedComponent2] = useRecoilState(
    $Dashboard2_Components
  );
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [doctorTrainings, setdoctorTrainings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://university-mohamed.vercel.app/Api/instructor/getinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);

        setdoctorTrainings(response.data.user.Training);
         } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken, setSelectedComponent2]); 

  const deleteTraining = async (trainingId) => {
    try {
      const response = await axios.delete(
        `https://university-mohamed.vercel.app/Api/instructor/training/${trainingId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response.data);

      // Remove the deleted training from the state
      setdoctorTrainings((prevTrainings) =>
        prevTrainings.filter((training) => training._id !== trainingId)
      );

      
    } catch (error) {
      console.error("Error deleting training:", error);
    }
  };

  return (
    <>
      <div className="enrollcourse">
        {doctorTrainings.map((training) => {
          return (
            <div className="course" key={training._id}>
              <div className="info">
                <p>{training.training_name}</p>
                <NavLink
                  onClick={() => setSelectedComponent2("StudentRegTraining")}
                  style={{ textDecoration: "none" }}
                  className="NavLink"
                >
                  <button type="button" className="btn btn-primary">
                    Students
                  </button>
                </NavLink>
              </div>
              <div className="img "></div>
            
            </div>
          );
        })}
      </div>
      <div className="get_all_student">
        <h2> All Students Reg Training </h2>
        <table style={{ textAlign: "center" }} className="table">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">FullName</th>
              <th scope="col">Training_code</th>
              <th scope="col">Phone</th>
              <th scope="col">Level</th>
              <th scope="col">Training_Id</th>
              <th scope="col">Training_Grade</th>
              <th scope="col">Submit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

              <td>
                {" "}
                <input
                  style={{
                    width: "150px",
                    alignItems: "center",
                    height: "25px",
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Student Grade"
                  aria-label="Student Grade"
                  name="Student_Grade"
                />
              </td>
              <td>
                <button
                  type="submit"
                  style={{
                    height: "25px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#996ae4",
                  }}
                >
                  Upload
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Training;


