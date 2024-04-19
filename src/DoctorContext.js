import React, { createContext, useContext, useState } from 'react'

const DoctorContext = createContext()

export const DoctorProvider = ({ children }) => {
  const [alldoctors, setalldoctors] = useState([])

  return (
    <DoctorContext.Provider value={{ alldoctors, setalldoctors }}>
      {children}
    </DoctorContext.Provider>
  )
}

export const useDoctorContext = () => {
  return useContext(DoctorContext)
}
