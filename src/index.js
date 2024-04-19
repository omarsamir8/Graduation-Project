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
import { routes } from './routes'

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

// Admins:
// Admin     Ahmed-Adel@gmail.com    MH2020salah
// Admin     omar@gmail.com      MH2020salah
// Student:30207271400258
// semester id    65d0a80a76670f142a67dde2
