import React from 'react'
import SideBar from '../ComponentForDoctors/SideBar'
import NavBar from '../ComponentForDoctors/NavBar'
import '../styles/MainPage.css'
import Poster from '../ComponentForDoctors/Poster'
import Dashboard from '../ComponentForDoctors/DashBoard'
import { useRecoilState } from 'recoil'
import { $Dashboard2_Components } from '../Atoms'
import Courses from '../ComponentForDoctors/Courses'
import Training from '../ComponentForDoctors/Training'
import StudentsResult from '../ComponentForDoctors/StudentResult'

function MainPageForDoctor () {
  const [selectedComponent2, setSelectedComponent2] = useRecoilState(
    $Dashboard2_Components
  )
  return (
    <>
      <div className='mainpage'>
        <div className='sidebar'>
          <SideBar />
        </div>
        <div className='container-page'>
          <div className='navbar'>
            <NavBar />
          </div>
          <div className='poster'>
            <Poster name='Mohamed' />
          </div>
          <div>
            {selectedComponent2 === 'DashBoard' && <Dashboard />}
            {selectedComponent2 === 'courses' && <Courses />}
            {/* {selectedComponent2 === "StudentRegCourse" && <StudentRegCourse />} */}
            {selectedComponent2 === 'Training' && <Training />}
            {/* {selectedComponent2 === "StudentRegTraining" && (
              <StudentRegTraining />
            )} */}
            {selectedComponent2 === 'StudentsResult' && <StudentsResult />}
          </div>
        </div>
      </div>
    </>
  )
}

export default MainPageForDoctor
