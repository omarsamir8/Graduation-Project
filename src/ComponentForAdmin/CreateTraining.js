import { useEffect, useState } from "react";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
import Swal from "sweetalert2";
import { useTrainingContext } from "../TrainingContext";
import { routes } from "../routes";
import testImg from "../assets/traing2jpeg.jpeg";
import { usePageContext } from "../PageContext";
import Select from "react-select";
import TitleAnimation from "../Loader/TitleAnimation";

function CreateTraining() {
  const [training_name, settraining_name] = useState("");
  const [desc, setdesc] = useState("");
  const [instructor_id, setinstructor_id] = useState("");
  const [start_date, setstart_date] = useState("");
  const [end_date, setend_date] = useState("");
  let { Page, setPage } = usePageContext(1);
  const { allTrainings, setAllTrainings } = useTrainingContext();
  const [message, setmessage] = useState("");
  const [selectedTrainingId, setselectedTrainingId] = useState(null);
  const [requirements, setrequirements] = useState("");
  const [OpenForRegister, setOpenForRegister] = useState("");
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [count, setcount] = useState(1);
  const [TrainingImage, setTrainingImage] = useState([]);
  const [trainingId, settrainingId] = useState("");
  const [alltrainingsAvailable, setalltrainingsAvailable] = useState([]);
  const [loading, setLoading] = useState(false);
  // create Training
  const createTraining = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.Training._id}${routes.Training.AddTraining}`,
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
            OpenForRegister,
            start_date,
            end_date,
            requirements,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setmessage(data.message);
      console.log(data.message);

      if (response.ok) {
        setLoading(false);
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Training added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        setLoading(false);
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
            text: data.error_Message[0].message,
            timer: 4500,
          });
        }
      }
    } catch (error) {
      console.error("Training creation failed", error);
    }
  };

  // delete course
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
        setLoading(true);
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.Training._id}${routes.Training.deleteTraining}?training_id=${trainingId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        if (response.ok) {
          setLoading(false);
          // On success, update the state to remove the deleted course
          setAllTrainings((prevTrainings) =>
            prevTrainings.filter((training) => training._id !== trainingId)
          );
          console.log(`Training with ID ${trainingId} deleted successfully.`);
          Swal.fire({
            icon: "success",
            title: "Training Deleted successfully",
            showConfirmButton: false,
            timer: 3500,
          });
        } else {
          setLoading(false);
          console.error(`Failed to delete training with ID ${trainingId}.`);
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: "Training Deleted Failed",
            timer: 4500,
          });
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // update Training
  const updateTraining = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.Training._id}${routes.Training.updateTraining}?training_id=${selectedTrainingId}`,
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
            start_date,
            OpenForRegister,
            end_date,
            requirements,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
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
                  start_date,
                  end_date,
                  OpenForRegister,
                  requirements,
                }
              : prevTraining
          )
        );

        // Clear the selected course and reset input fields
        setselectedTrainingId(null);
        settraining_name("");
        setdesc("");
        setstart_date("");
        setend_date("");
        setrequirements("");
      } else {
        setLoading(false);
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Trainng Updated Failed",
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

  // upload training photo
  const uploadtrainingimage = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("TrainingImage", TrainingImage);
      formData.append("trainingId", trainingId);

      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.Training._id}${routes.Training.AddImages}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
            // No need to specify Content-Type header for FormData
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      setmessage(data.message);
      if (response.ok) {
        setLoading(false);
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Training Image added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        setLoading(false);
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: data.error_Message
            ? data.error_Message[0].message
            : data.message,
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  const increment = () => {
    setPage((prevPage) => prevPage + 1);
    // Increment count by 1
  };
  const decrement = () => {
    setPage((prevPage) => prevPage - 1);
    // Increment count by 1
  };

  // Fetch all Trainings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.Training._id}${routes.Training.allTrainingByAdmin}?page=1&size=20&sort=training_name`,
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
  console.log(alltrainingsAvailable);

  if (loading) {
    return <TitleAnimation />;
  }

  function makecamelcase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <div className="Create_Student">
        <h2 className="create_student">Add Training</h2>
        <marquee className="marquee" scrollamount="10">
          {" "}
          It is not possible for more than one training to have the same name
          ,training code{" "}
        </marquee>
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
              placeholder="Enter Training Requiremets"
              aria-label="requirements"
              name="requirements"
              value={requirements}
              onChange={(e) => {
                setrequirements(e.target.value);
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

            <Select
              isMulti
              name="Training"
              options={alltrainingsAvailable.map((training) => {
                return { value: training._id, label: training.training_name };
              })}
              onChange={(selectedOptions, e) => {
                const selectedLabels = selectedOptions.map(
                  (option) => option.value
                );
                settrainingId(selectedLabels);
              }}
              className="Materials_select"
              classNamePrefix="select"
              placeholder="Select Training ID"
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
            <select
              className="form-control mt-3"
              aria-label="OpenForRegistration"
              name="OpenForRegistration"
              value={OpenForRegister}
              onChange={(e) => {
                setOpenForRegister(e.target.value);
              }}
            >
              <option value="" disabled>
                Open For Registration
              </option>
              <option value="true">True </option>
              <option value="false">False</option>
            </select>
            <input
              type="file"
              class="form-control mt-3"
              placeholder="Enter Training Image"
              aria-label="TrainingImage"
              name="TrainingImage"
              onChange={(e) => {
                setTrainingImage(e.target.files[0]);
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
        <button
          style={{ width: "150px", marginLeft: "10px" }}
          type="button"
          className="btn btn-primary mt-3"
          onClick={uploadtrainingimage}
        >
          Upload Image
        </button>

        <h2>All Trainings Added</h2>
      </div>
      <div className="enrollcourse">
        {allTrainings &&
          allTrainings.map((training) => (
            <div className="course" key={training._id}>
              <p className="open-now">Open Now</p>{" "}
              <img
                src={
                  training.images && training.images.length > 0
                    ? training.images[0].url
                    : testImg
                }
                alt=""
              />
              <div className="infooo">
                <h3>{makecamelcase(training.training_name)}</h3>
                <p>4 Months</p>
              </div>
              <div className="up-del-btn">
                <button
                  type="button"
                  style={{
                    backgroundColor: "#996ae4",
                    borderColor: "#996ae4",
                  }}
                  className="btn btn-primary"
                  onClick={() => {
                    setselectedTrainingId(training._id);
                    settraining_name(training.training_name);
                    setdesc(training.desc);
                    setinstructor_id(training.instructor_id);
                    setstart_date(training.start_date);
                    setend_date(training.end_date);
                    setrequirements(training.requirements);
                    setOpenForRegister(training.OpenForRegister);
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
          ))}
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li
              onClick={() => {
                decrement();
              }}
              class="page-item"
            >
              <a class="page-link" href="#previous" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li
              onClick={() => {
                setPage(1);
              }}
              class="page-item"
            >
              <a class="page-link" href="#1">
                1
              </a>
            </li>
            <li
              onClick={() => {
                setPage(2);
              }}
              class="page-item"
            >
              <a class="page-link" href="#2">
                2
              </a>
            </li>
            <li
              onClick={() => {
                setPage(3);
              }}
              class="page-item"
            >
              <a class="page-link" href="#3">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#3">
                ......
              </a>
            </li>
            <li class="page-item">
              <a
                onClick={() => {
                  increment();
                }}
                class="page-link"
                href="#next"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
export default CreateTraining;
