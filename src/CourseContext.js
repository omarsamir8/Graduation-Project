// TrainingContext.js
import { createContext, useContext, useState } from 'react'

const CourseContext = createContext()

const CourseProvider = ({ children }) => {
  const [allcourses, setallcourses] = useState([]) // Ensure it's initialized as an empty array

  // Other context provider logic...

  return (
    <CourseContext.Provider value={{ allcourses, setallcourses }}>
      {children}
    </CourseContext.Provider>
  )
}

const useCourseContext = () => {
  return useContext(CourseContext)
}

export { CourseProvider, useCourseContext }
