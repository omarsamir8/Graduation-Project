import React from "react";
import ReactDOM from "react-dom";
import { StudentProvider } from "./StudentContext";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { DoctorProvider } from "./DoctorContext";
import { TrainingProvider } from "./TrainingContext";
import { CourseProvider } from "./CourseContext";
import { PageProvider } from "./PageContext";


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <StudentProvider>
        <DoctorProvider>
          <TrainingProvider>
            <CourseProvider>
              <PageProvider>
                <App />
              </PageProvider>
            </CourseProvider>
          </TrainingProvider>
        </DoctorProvider>
      </StudentProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();


// 266120200100905
// 30210011413055