import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/SideBar.css'
import { useRecoilState } from 'recoil'
import { $Dashboard_Components } from '../Atoms'
import Semester_grade from '../pages/Semester_grade'
import { useState } from 'react'
function SideBar () {
  const navigate = useNavigate()
  const [isClicked, setIsClicked] = useState(false)
  const [Color, setColor] = useState('')
  const [SelectedComponent, SetSelectedComponent] = useState(null)
  const handleClick = (componentName) => {
    setSelectedComponent(componentName)
    window.scrollTo(0, 750)
  }



  function logout () {
    navigate('/')
    localStorage.clear()
  }

  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard_Components
  )
  return (
    <>
      <div className='sidebar-container'>
        <div className='icon-container'>
          {/* <i class="fa-solid fa-graduation-cap"></i> */}
          <img src='./assets/images/art.jpeg' alt='' />
        </div>
        {/* Dashboard Item */}
        <div className='item col-12'>
          <i
            class='fa-solid fa-gauge' onClick={() => handleClick('DashBoard')}
            style={{
              textDecoration: 'none',
              color: selectedComponent === 'DashBoard' ? 'black' : 'inherit',
              transform:
                selectedComponent === 'DashBoard' ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
          />
          <li
            onClick={() => handleClick('DashBoard')}
            style={{
              textDecoration: 'none',
              color: selectedComponent === 'DashBoard' ? 'black' : 'inherit',
              transform:
                selectedComponent === 'DashBoard' ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
            className='Side_li'
          >
            Dashboard
          </li>
        </div>
        {/* Dashboard Item End  */}

        <div className='item col-12'>
          <i
            class='fa-solid fa-book-open' onClick={() => handleClick('RegisterForCourse')}
            style={{
              textDecoration: 'none',
              color: selectedComponent === 'RegisterForCourse' ? 'black' : 'inherit',
              transform:
                selectedComponent === 'RegisterForCourse' ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
          />
          <li
            onClick={() => handleClick('RegisterForCourse')}
            style={{
              textDecoration: 'none',
              color: selectedComponent === 'RegisterForCourse' ? 'black' : 'inherit',
              transform:
                selectedComponent === 'RegisterForCourse' ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
            className='Side_li'
          >
            Register For Course
          </li>
        </div>
        <div className='item col-12'>
          <i class='fa-brands fa-stack-overflow' />
          <NavLink to='/Registered_Courses' className='NavLink'>
            Registered Courses
          </NavLink>
        </div>
        <div className='item col-12'>
          <i class='fa-solid fa-layer-group' />
          <li
            onClick={() => handleClick('RegisterForTraining')}
            style={{
              textDecoration: 'none',
              color: selectedComponent === 'RegisterForTraining' ? 'black' : 'inherit',
              transform:
                selectedComponent === 'RegisterForTraining' ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
            className='Side_li'
          >
            Register For Training
          </li>
        </div>
        <div className='item col-12'>
          <i class='fa-brands fa-stack-overflow' />
          <li
            onClick={() => handleClick('RegisteredTraining')}
            style={{
              textDecoration: 'none',
              color: selectedComponent === 'RegisteredTraining' ? 'black' : 'inherit',
              transform:
                selectedComponent === 'RegisteredTraining' ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
            className='Side_li'
          >
            Registered Training
          </li>
        </div>
        <div className='item col-12'>
          <i class='fa-solid fa-square-poll-vertical' />
          <NavLink to='/Semester_grade' className='NavLink'>
            Semester Grades
          </NavLink>
        </div>
        <div className='item col-12'>
          <i class='fa-solid fa-square-plus' />
          <NavLink to='/Reports_student' className='NavLink'>
            Newspaper
          </NavLink>
        </div>
        <div className='item col-12'>
          <i class='fa-solid fa-address-card' />
          <NavLink
            className='NavLink'
            onClick={() => setSelectedComponent('Department')}
          >
            Department
          </NavLink>
        </div>

        <div className='item col-12'>
          <i class='fa-solid fa-message' />
          <NavLink className='NavLink'>Chat</NavLink>
        </div>
        <div className='login col-12'>
          <i class='fa-solid fa-right-from-bracket' />
          <p onClick={logout} className='logout_Button'>
            Logout
          </p>
        </div>
      </div>
    </>
  )
}
export default SideBar
