import '../styles/Poster.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { routes } from '../routes'
function Poster () {
  const [SuperAdminInfo, setSuperAdminInfo] = useState([])
  const accessToken = localStorage.getItem('accesstoken')
  const refreshToken = localStorage.getItem('refreshtoken')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.Admin._id}${routes.Admin.getinfoSuper}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'refresh-token': refreshToken
            }
          }
        )
        console.log(response.data)
        setSuperAdminInfo(response.data.user)
        console.log(SuperAdminInfo)
        // Log the updated state
      } catch (error) {
        console.error('Error fetching Super Admin info:', error)
      }
    }

    fetchData()
  }, [accessToken, refreshToken])
  return (
    <>
      <div className='poster'>
        <div>
          <p className='p1'>September ,2024</p>
          <h2>Welcome Back,{SuperAdminInfo.FullName}!</h2>
          <p className='p2'>Alwayes stay updated in your student portal</p>
        </div>

        <img
          src='./assets/images/student.png'
          className='studentt'
          alt=''
        />
      </div>
    </>
  )
}
export default Poster
