import React, { createContext, useContext, useState } from 'react'

const StudentContext = createContext()

export const StudentProvider = ({ children }) => {
  const [allstudents, setallstudents] = useState([])

  return (
    <StudentContext.Provider value={{ allstudents, setallstudents }}>
      {children}
    </StudentContext.Provider>
  )
}

export const useStudentContext = () => {
  return useContext(StudentContext)
}
