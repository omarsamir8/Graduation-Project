import '../styles/Poster.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import 'animate.css'
import { routes } from '../routes'
function Poster (props) {
  const [admininfo, setadmininfo] = useState([])
  const accessToken = localStorage.getItem('accesstoken')
  const refreshToken = localStorage.getItem('refreshtoken')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.Admin._id}${routes.Admin.getinfoAdmin}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'refresh-token': refreshToken
            }
          }
        )
        console.log(response.data)
        setadmininfo(response.data.user)
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
          <p className='p1 animate__animated animate__backInRight'>
            September ,2024
          </p>
          <h2 className=' animate__animated animate__backInRight'>
            Welcom Back, {admininfo.FullName} !
          </h2>
          <p className='p2  animate__animated animate__backInRight'>
            Alwayes Stay Updated In Your Student Portal
          </p>
        </div>
        <img
          src='./assets/images/student.png'
          className='studentt  animate__animated animate__backInRight'
          alt=''
        />
      </div>
    </>
  )
}
export default Poster
