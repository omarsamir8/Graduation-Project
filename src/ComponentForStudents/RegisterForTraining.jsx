import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { routes } from "../routes";
import { Link } from "react-router-dom";
import defulatimg from "../assets/traing2jpeg.jpeg";
import TitleAnimation from "../Loader/TitleAnimation";

export default function RegisterForTraining() {
  const [alltrainingsAvailable, setalltrainingsAvailable] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [training, setTraining] = useState(null);
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [loading, setLoading] = useState(false);
  // Register for training
  const RegisterForTraining = async (tainingId) => {
    setLoading(true);
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
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Course registered successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: data.error_Message
            ? data.error_Message[0].message
            : data.message,
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
      setLoading(true);
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
        if (response.ok) {
          setLoading(false);
        } else {
          setLoading(false);
        }
        console.log(data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };
    console.log("startdate :", startdate);
    fetchData();
  }, [accessToken, refreshToken]);

  if (loading) {
    return <TitleAnimation />;
  }
  return (
    <>
      <div className="Create_Student">
        <h2>All Trainings Available</h2>
      </div>
      <div className="enrollcourse">
        {alltrainingsAvailable.map((training) => {
          return (
            <div
              style={{ height: "420px" }}
              className="course"
              key={training._id}
            >
              <p className="open-now">Open Now</p>{" "}
              {training && training.images && training.images.length > 0 ? (
                <img src={training.images[0].url} alt="" />
              ) : (
                <img src={defulatimg} alt="" />
              )}
              <div className="info">
                <h3>{training.training_name}</h3>
                <p style={{ marginTop: "-20px", color: "gray" }}>
                  Start Date:{" "}
                  {new Date(training.start_date).toLocaleDateString()}
                </p>
                <p style={{ marginTop: "-20px", color: "gray" }}>
                  End Date: {new Date(training.end_date).toLocaleDateString()}
                </p>
              </div>
              <div className="up-del-btn">
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
            </div>
          );
        })}
      </div>
    </>
  );
}
