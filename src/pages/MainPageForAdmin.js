import React, { useState } from 'react'
import SideBar from '../ComponentForAdmin/SideBar'
import NavBar from '../ComponentForAdmin/NavBar'
import Poster from '../ComponentForAdmin/Poster'
import CreateCourse from '../ComponentForAdmin/CreateCourse'
import CreateDoctor from '../ComponentForAdmin/CreateDoctor'
import CreateStudent from '../ComponentForAdmin/CreateStudent'
import CreateTraining from '../ComponentForAdmin/CreateTraining'
import '../styles/MainPage.css'
import DashBoard from '../ComponentForAdmin/DashBoard'
import { useRecoilState } from 'recoil'
import { $Dashboard_Components } from '../Atoms'
import All_Students from '../ComponentForAdmin/All_Students'
import AllDoctors from '../ComponentForAdmin/All_Doctors'
import CreateSemester from '../ComponentForAdmin/CreateSemester'
import Setting from '../ComponentForAdmin/Setting'

function MainPageForAdmin () {
  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard_Components
  )

  return (
    <>
      <div className='mainpage' style={{ minHeight: '100vh' }}>
        <div className='sidebar '>
          <SideBar />
        </div>
        <div className='container-page '>
          <div className='navbar'>
            <NavBar />
          </div>
          <div className='poster'>
            <Poster name='Admin' />
          </div>
          <div>
            {selectedComponent === 'DashBoard' && <DashBoard />}
            {selectedComponent === 'CreateStudent' && <CreateStudent />}
            {selectedComponent === 'All_Students' && <All_Students />}
            {selectedComponent === 'CreateDoctor' && <CreateDoctor />}
            {selectedComponent === 'AllDoctors' && <AllDoctors />}
            {selectedComponent === 'CreateCourse' && <CreateCourse />}
            {selectedComponent === 'CreateTraining' && <CreateTraining />}
            {selectedComponent === 'CreateSemester' && <CreateSemester />}
            {selectedComponent === 'setting' && <Setting />}
          </div>
        </div>
      </div>
    </>
  )
}

export default MainPageForAdmin
