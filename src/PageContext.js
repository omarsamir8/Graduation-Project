import React, { createContext, useContext, useState } from 'react'

const PageContext = createContext()

export const PageProvider = ({ children }) => {
  const [Page, setPage] = useState([])

  return (
    <PageContext.Provider value={{ Page, setPage }}>
      {children}
    </PageContext.Provider>
  )
}

export const usePageContext = () => {
  return useContext(PageContext)
}
