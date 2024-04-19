import '../styles/NavBar.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { routes } from '../routes'
import Swal from 'sweetalert2'
function NavBar () {
  const [studentinfo, setStudentInfo] = useState([])
  const [studentImage, setstudentImage] = useState('')
  const [message, setmessage] = useState('')
  const accessToken = localStorage.getItem('accesstoken')
  const refreshToken = localStorage.getItem('refreshtoken')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.student._id}${routes.student.getInfo}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'refresh-token': refreshToken
            }
          }
        )
        console.log(response.data)
        setStudentInfo(response.data.result)
        console.log(studentinfo)
        // Log the updated state
      } catch (error) {
        console.error('Error fetching student info:', error)
      }
    }

    fetchData()
  }, [accessToken, refreshToken])
  console.log(studentinfo)

  // Upload Student Photo
  const uploadstudentimage = async () => {
    try {
      const formData = new FormData()
      formData.append('studentImage', studentImage)

      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.student._id}${routes.student.AddImgByStu}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'refresh-token': refreshToken
          },
          body: formData
        }
      )
      const data = await response.json()
      console.log(data)
      setmessage(data.message)
      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: 'success',
          title: 'Student Image added successfully',
          showConfirmButton: false,
          timer: 3500
        })
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: 'error',
          title: 'Fail',
          text: 'Student Image creation failed, please try again later',
          timer: 4500
        })
      }
    } catch (error) {
      console.error('Upload failed', error)
    }
  }
  return (
    <>
      <div className='nav-bar'>
        <div className='search'>
          <input type='text' placeholder='Search' />
        </div>
        <div className='info'>
          <img
            type='button'
            class=''
            data-bs-toggle='modal'
            data-bs-target='#exampleModal'
            src={studentinfo.url}
            alt=''
          />

          <div
            class='modal fade'
            id='exampleModal'
            tabindex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div class='modal-dialog'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title' id='exampleModalLabel'>
                    Upload Photo
                  </h5>
                  <button
                    type='button'
                    class='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  />
                </div>
                <div class='modal-body'>
                  <input
                    class='form-control'
                    type='file'
                    placeholder='Default input'
                    aria-label='default input example'
                    onChange={(e) => {
                      setstudentImage(e.target.files[0])
                    }}
                  />
                </div>
                <div class='modal-footer'>
                  <button
                    type='button'
                    class='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      uploadstudentimage()
                    }}
                    type='button'
                    class='btn btn-primary'
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='details'>
            <h3>{studentinfo.Full_Name}</h3>
            <p> Level : {studentinfo.level}</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default NavBar
