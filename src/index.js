import React from 'react'
import ReactDOM from 'react-dom'
import { StudentProvider } from './StudentContext'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { RecoilRoot } from 'recoil'
import { DoctorProvider } from './DoctorContext'
import { TrainingProvider } from './TrainingContext'
import { CourseProvider } from './CourseContext'


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>

      <StudentProvider>
        <DoctorProvider>
          <TrainingProvider>
            <CourseProvider>
              <App />
            </CourseProvider>
          </TrainingProvider>
        </DoctorProvider>
      </StudentProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()


