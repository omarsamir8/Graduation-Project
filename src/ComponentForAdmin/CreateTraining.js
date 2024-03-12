import { useEffect, useState } from "react";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
import Swal from "sweetalert2";
import { useTrainingContext } from "../TrainingContext";
function CreateTraining() {
  const [training_name, settraining_name] = useState("");
  const [desc, setdesc] = useState("");
  const [instructor_id, setinstructor_id] = useState("");
  const [start_date, setstart_date] = useState("");
  const [end_date, setend_date] = useState("");
  const { allTrainings, setAllTrainings } = useTrainingContext();
  const [message, setmessage] = useState("");
  const [selectedTrainingId, setselectedTrainingId] = useState(null);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [count, setcount] = useState(1);

  // create Training
  const createTraining = async () => {
    try {
      const response = await fetch(
        "https://university-lyart.vercel.app/Api/training/addtraining",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            training_name,
            desc,
            instructor_id,
            start_date,
            end_date,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setmessage(data.message);
      console.log(data.message);

      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Training added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        // Show an error message if needed
        if (data.message === "Training name already exists") {
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: `${data.message}`,
            timer: 4500,
          });
        } else if (data.message === "validation Error") {
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: `other error`,
            timer: 4500,
          });
        }
      }
    } catch (error) {
      console.error("Training creation failed", error);
    }
  };

  // get all Trainings
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://university-lyart.vercel.app/Api/training/alltraining?select=training_name&page=${count}&size=9`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             "refresh-token": refreshToken,
  //           },
  //         }
  //       );

  //       const data = await response.json();

  //       // Ensure data.training is an array before updating state
  //       if (Array.isArray(data.training)) {
  //         setAllTrainings((prevTrainings) => [
  //           ...prevTrainings,
  //           ...data.training,
  //         ]);
  //       } else {
  //         console.error("Invalid data format received from the server.");
  //       }
  //     } catch (error) {
  //       console.error("Fetch failed", error);
  //     }
  //   };

  //   fetchData();
  // }, [accessToken, refreshToken, count]);

  // useEffect(() => {
  //   console.log(allTrainings);
  // }, [allTrainings]);

  // delete course
  const deleteTraining = async (trainingId) => {
    try {
      const response = await fetch(
        `https://university-lyart.vercel.app/Api/training/deletetraining?training_id=${trainingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );

      if (response.ok) {
        // On success, update the state to remove the deleted course
        setAllTrainings((prevTrainings) =>
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

  // update Training
  const updateTraining = async (trainingId) => {
    try {
      const response = await fetch(
        `https://university-lyart.vercel.app//Api/training/updatetraining?training_id=${trainingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            training_name,
            desc,
            instructor_id,
            start_date,
            end_date,
          }),
        }
      );

      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Training updated successfully",
          showConfirmButton: false,
          timer: 3500,
        });

        // Update the state with the modified course
        setAllTrainings((prevTrainings) =>
          prevTrainings.map((prevTraining) =>
            prevTraining._id === selectedTrainingId
              ? {
                  ...prevTraining,
                  training_name,
                  desc,
                  instructor_id,
                  start_date,
                  end_date,
                }
              : prevTraining
          )
        );

        // Clear the selected course and reset input fields
        setselectedTrainingId(null);
        settraining_name("");
        setdesc("");
        setinstructor_id("");
        setstart_date("");
        setend_date("");
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Training update failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const loadMore = () => {
    // Increment the count when loading more
    setcount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <div className="Create_Student">
        <h2 className="create_student">Add Training</h2>
        <form class="row mt-4">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Training Name"
              aria-label="trainingName"
              name="training_name"
              value={training_name}
              onChange={(e) => {
                settraining_name(e.target.value);
              }}
            />

            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter Training Description"
              aria-label="trainingDescription"
              name="desc"
              value={desc}
              onChange={(e) => {
                setdesc(e.target.value);
              }}
            />
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter Instructor Id"
              aria-label="training_Instructor_Id"
              name="instructor_id"
              value={instructor_id}
              onChange={(e) => {
                setinstructor_id(e.target.value);
              }}
            />
          </div>
          <div class="col part2">
            <input
              type="date"
              class="form-control"
              placeholder="Enter Starting Date"
              aria-label="training_Starting_Date"
              name="start_date"
              value={start_date}
              onChange={(e) => {
                setstart_date(e.target.value);
              }}
            />
            <input
              type="date"
              class="form-control mt-3"
              placeholder="Enter Ending Date"
              aria-label="training_Ending_Date"
              name="end_date"
              value={end_date}
              onChange={(e) => {
                setend_date(e.target.value);
              }}
            />
          </div>
        </form>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={selectedTrainingId ? updateTraining : createTraining}
        >
          {selectedTrainingId ? "Update" : "Submit"}
        </button>
        <h2>All Trainings Added</h2>
      </div>
      <div className="enrollcourse">
        {allTrainings &&
          allTrainings.map((training) => (
            <div className="course" key={training._id}>
              <div className="info">
                <p>{training.training_name}</p>
                <div className="img"></div>
                <div className="up-del-btn">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setselectedTrainingId(training._id);
                      settraining_name(training.training_name);
                      setdesc(training.desc);
                      setinstructor_id(training.instructor_id);
                      setstart_date(training.start_date);
                      setend_date(training.end_date);
                    }}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger delete_btn"
                    onClick={() => deleteTraining(training._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        className="loadmore"
        style={{
          width: "320px",
          height: "50px",
          border: "none",
          outline: "none",
          background: "#996ae4",
          borderRadius: "10px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          color: "white",
          marginLeft: "10px",
          marginBottom: "20px",
          fontSize: "22px",
        }}
        onClick={loadMore}
      >
        Loading More
      </button>
    </>
  );
}
export default CreateTraining;
