import React, { createContext, useContext, useState, useEffect } from "react";

interface SessionProps {
  myName: string | null;
  setMyName: React.Dispatch<React.SetStateAction<string | null>> | null;
}

interface SessionWrapperProps {
  children: React.ReactNode;
}

const AppContext = createContext({ myName: "", setMyName: null } as SessionProps);

export const SessionWrapper:React.FunctionComponent<SessionWrapperProps> = (props : SessionWrapperProps) => {
  const [myName, setMyName] = useState(localStorage.getItem("myName"));

  useEffect(() => {
    localStorage.setItem("myName", myName || "");
  }, [myName]);

  return (
    <>
      <AppContext.Provider
        value={{
          myName: myName,
          setMyName: setMyName
        }}
      >
        {props.children}
      </AppContext.Provider>
    </>
  );
};

export const useSession = () => useContext(AppContext);
