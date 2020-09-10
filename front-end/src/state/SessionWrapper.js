import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const SessionWrapper = ({ children }) => {
  const [myName, setMyName] = useState(localStorage.getItem('myName'))

  useEffect(() => {
    localStorage.setItem('myName', myName)
  }, [myName])

  return (
    <>
      <AppContext.Provider
        value={{
          myName: myName,
          setMyName: setMyName,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  )
}

export const useSession = () => useContext(AppContext)
