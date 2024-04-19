import React, { createContext, useContext, useState } from 'react'

const SemsterContext = createContext()

export const SemesterProvider = ({ children }) => {
  const [allsemster, setallsemster] = useState([])

  return (
    <SemsterContext.Provider value={{ allsemster, setallsemster }}>
      {children}
    </SemsterContext.Provider>
  )
}

export const useSemsterContext = () => {
  return useContext(SemsterContext)
}
