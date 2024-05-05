// import React from 'react'
// // import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
// import './Chart.scss'
// const data = [
//   { value: 5, label: 'المطاعم المساهمة' },
//   { value: 8, label: 'الجمعيات المتاحة' },
//   { value: 89, label: 'المتطوعين' },

// ];

// const size = {
//   width: 400,
//   height: 200,
// };
// export default function Chart() {
//     return (
//         <>
//         <div className='col-12 '>
//           <div className='col-12 container'>
//              <div className="row charts">
//               <div className='col-md-6 col-sm-12'>
//                 <div className="row ">
//                 <BarChart
//                   xAxis={[{ scaleType: 'band', data: ['المطاعم المساهمة', 'الجمعيات المتاحة', 'المتطوعين'] }]}
//                   series={[{ data: [5, 8, 89] }]}  // Use your actual data here
//                   width={500}
//                   height={300}

//                 />

//                 </div>
//               </div>
//               <div className='col-md-6 col-sm-12'>
//                 <div className="row">
//                 <PieChart
//       series={[
//         {
//           arcLabel: (item) => `${item.label} (${item.value})`,
//           arcLabelMinAngle: 45,
//           data,
//         },
//       ]}
//       sx={{
//         [`& .${pieArcLabelClasses.root}`]: {
//           fill: 'whiteSmoke',
//           fontWeight: 'bold',
//         },
//       }}
//       {...size}
//     />
//                 </div>
//               </div>
//              </div>
//           </div>

//         </div>

//         </>

//       );
// }

// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';

// export default function StackBars() {
//   return (
//     <BarChart
//       series={[
//         { data: [3, 4, 1, 6, 5], stack: 'A', label: 'Series A1' },
//         { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Series A2' },
//         { data: [4, 2, 5, 4, 1], stack: 'B', label: 'Series B1' },
//         { data: [2, 8, 1, 3, 1], stack: 'B', label: 'Series B2' },
//         { data: [10, 6, 5, 8, 9], label: 'Series C1' },
//       ]}
//       width={600}
//       height={350}
//     />
//   );
// }

// import React, { useEffect } from 'react';
// import Chart from 'chart.js/auto';
// import { useParams } from 'react-router-dom';
// import { useState } from 'react';
// import { routes } from '../../routes';
// const accessToken = localStorage.getItem("accesstoken");
// const refreshToken = localStorage.getItem("refreshtoken");
// const AcquisitionsChart = () => {
//   const [dashboardinfo, setdashboardinfo] = useState([]);
//   const [acquisitionsData, setAcquisitionsData] = useState([]);
//   const studentsCount = 50; // Example student count fetched from API or elsewhere
//   setdashboardinfo({ students: studentsCount })
//   useEffect(() => {
//     const data = [
//       { year: 2010, count:studentsCount  },
//       { year: 2011, count: 20 },
//       { year: 2012, count: 15 },
//       { year: 2013, count: 25 },
//       { year: 2014, count: 22 },
//       { year: 2015, count: 30 },
//       { year: 2016, count: 28 },
//     ];

//     const ctx = document.getElementById('acquisitions').getContext('2d');
//     new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: data.map(row => row.year),
//         datasets: [{
//           label: 'Acquisitions by year',
//           data: data.map(row => row.count)
//         }]
//       }
//     });
//   }, []);

//    // get Dashboard Info
//    useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://university-mohamed.vercel.app${routes.Admin._id}${routes.Admin.dashboardAdmin}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "refresh-token": refreshToken,
//             },
//           }
//         );

//         const data = await response.json();
//         setdashboardinfo(data.info);
//         console.log(data.info);
//       } catch (error) {
//         console.error("Fetch failed", error);
//       }
//     };

//     fetchData();
//   }, [accessToken, refreshToken]);

//   return (
//     <div style={{ width: '800px' }}>
//       <canvas id="acquisitions"></canvas>
//     </div>
//   );
// };

// export default AcquisitionsChart;

import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { routes } from "../../routes";

const accessToken = localStorage.getItem("accesstoken");
const refreshToken = localStorage.getItem("refreshtoken");

const AcquisitionsChart = () => {
  const [acquisitionsData, setAcquisitionsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.Admin._id}${routes.Admin.dashboardAdmin}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = await response.json();

        // Update acquisitions data
        const chartData = [
          { year: "Students", count: data.info.students },
          { year: "Instructors", count: data.info.instructors },
          { year: "Courses", count: data.info.courses },
          { year: "Training", count: data.info.training },
          { year: "Semesters", count: data.info.semsters },
        ];
        setAcquisitionsData(chartData);

        // Chart rendering logic
        const ctx = document.getElementById("acquisitions").getContext("2d");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: chartData.map((row) => row.year),
            datasets: [
              {
                label: "Acquisitions by all",
                data: chartData.map((row) => row.count),
              },
            ],
          },
        });
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]); // Ensure useEffect runs only when access tokens change

  return (
    <div style={{ width: "1000px", marginTop: "2rem" }}>
      <canvas id="acquisitions"></canvas>
    </div>
  );
};

export default AcquisitionsChart;
