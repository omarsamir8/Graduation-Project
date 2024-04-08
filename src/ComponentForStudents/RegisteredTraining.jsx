import React, { useEffect, useState } from 'react'

export default function RegisteredTraining() {
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
const [trainingsregisterd,settrainingsregisterd]=useState([])
   // get registerd courses
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app/Api/Register/Training/getTrainingInfo`,
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
        settrainingsregisterd(data.result);
       
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  console.log(trainingsregisterd);
  return (
    <>
    <div className="Create_Student">
    <h2>Training Registered</h2>
  </div>
  <div className="enrollcourse">
    <div className="course">
      <div className="info">
        <p>Object Oriented Programming</p>
        {/* <button type="button" class="btn btn-primary">
          Register
        </button> */}
      </div>
      <div className="img "></div>
    </div>
  
   
  
  
   
  </div>
  </>
  )
}
