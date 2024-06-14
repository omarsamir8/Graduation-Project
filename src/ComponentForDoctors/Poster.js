import '../styles/Poster.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { routes } from '../routes'
function Poster () {
  const [doctorinfo, setDoctorInfo] = useState([])
  const accessToken = localStorage.getItem('accesstoken')
  const refreshToken = localStorage.getItem('refreshtoken')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.instructor._id}${routes.instructor.InstructorInfo}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'refresh-token': refreshToken
            }
          }
        )
        console.log(response.data)
        setDoctorInfo(response.data.user)
      } catch (error) {
        console.error('Error fetching doctor info:', error)
      }
    }

    fetchData()
  }, [accessToken, refreshToken])

  return (
    <>
      <div className='poster'>
        <div>
          <p className='p1'>September, 2024</p>
          <h2>Welcome Back, Dr {doctorinfo.FullName}</h2>
          <p className='p2'>Always stay updated in your student portal</p>
        </div>
        <img src='./assets/images/student.png' className='studentt' alt='' />
      </div>
    </>
  )
}

export default Poster
