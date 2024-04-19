// TrainingContext.js
import { createContext, useContext, useState } from 'react'

const TrainingContext = createContext()

const TrainingProvider = ({ children }) => {
  const [allTrainings, setAllTrainings] = useState([]) // Ensure it's initialized as an empty array

  // Other context provider logic...

  return (
    <TrainingContext.Provider value={{ allTrainings, setAllTrainings }}>
      {children}
    </TrainingContext.Provider>
  )
}

const useTrainingContext = () => {
  return useContext(TrainingContext)
}

export { TrainingProvider, useTrainingContext }
