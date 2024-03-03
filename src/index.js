import React from "react";
import ReactDOM from "react-dom/client";
import { StudentProvider } from "./StudentContext";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { DoctorProvider } from "./DoctorContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <StudentProvider>
      <DoctorProvider>
        <App />
      </DoctorProvider>
    </StudentProvider>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Admin     Ahmed-Adel@gmail.com    MH2020salah
// Admin     omar@gmail.com      MH2020salah
// Student   82345678901234      92345678901234
//semester id    65d0a80a76670f142a67dde2
