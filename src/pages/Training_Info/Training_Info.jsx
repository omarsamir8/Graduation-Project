import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { routes } from "../../routes";
import "./traininginfo.css";

const TrainingInfo = () => {
  const { trainingId } = useParams(); // Get training ID from URL parameter
  const [trainingData, setTrainingData] = useState([]);
  const [trainingimages, settrainingimages] = useState([]);
  const [AllowLevel, setAllowLevel] = useState([]); // Initialize trainingData state with an empty object
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
        setTrainingData(data.training);
        setAllowLevel(data.training.AllowLevel);
        settrainingimages(data.training.images);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [trainingId, accessToken, refreshToken]);
  console.log(trainingData);
  console.log(AllowLevel);
  console.log(trainingimages);

  return (
    <>
      <h3
        style={{
          textAlign: "center",
          marginTop: "10px",
          fontWeight: "bold",
          fontFamily: "cursive",
        }}
      >
        Training Details
      </h3>
      <div
        style={{
          margin: "auto",
          height: "2px",
          width: "120px",
          backgroundColor: "black",
        }}
      ></div>
      <div style={{ marginTop: "20px" }} className="productdisplay">
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            {trainingimages.map((img, index) => {
              if (trainingimages[index] && trainingimages[index].url) {
                return (
                  <img key={index} src={trainingimages[index].url} alt="" />
                );
              } else {
                return null;
              }
            })}
            {/* {trainingimages.length > 0 && (
              <img src={trainingimages[0].url} alt="" />
            )}
            {trainingimages.length > 0 && (
              <img src={trainingimages[0].url} alt="" />
            )} */}
          </div>
          <div className="productdisplay-img">
            {trainingimages.length > 0 && (
              <img
                style={{ height: "460px" }}
                className="productdisplay-main-img"
                src={trainingimages[0].url}
                alt=""
              />
            )}
          </div>
        </div>
        <div className="productdisplay-right">
          <h1>{trainingData.training_name}</h1>
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old"></div>
            <div className="productdisplay-right-price-new"></div>
          </div>
          <div className="productdisplay-right-descriptions">
            {trainingData.desc}
          </div>
          <div className="productdisplay-right-size">
            <h1>Allow For Level</h1>
            <div className="productdisplay-right-sizes">
              {AllowLevel.map((level) => {
                return <div>{level}</div>;
              })}{" "}
            </div>
          </div>
          <p
            style={{ marginTop: "15px" }}
            className="productdisplay-right-category"
          >
            <span>Open For Register :</span> {trainingData.OpenForRegister} True
          </p>
          <p className="productdisplay-right-category">
            <span>Start Date :</span>{" "}
            {new Date(trainingData.start_date).toLocaleDateString()}
          </p>
          <p className="productdisplay-right-category">
            <span>End Date:</span>{" "}
            {new Date(trainingData.end_date).toLocaleDateString()}
          </p>
          <p className="productdisplay-right-category">
            <Link to="/student" style={{ cursor: "pointer", color: "#b893dd" }}>
              Back~~~~
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default TrainingInfo;
