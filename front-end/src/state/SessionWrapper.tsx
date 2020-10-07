import React, { createContext, useContext, useState, useEffect } from "react";
import io from 'socket.io-client';
import * as Conf from '../Conf'
import * as EphemeralMgr from '../security_privacy/EphemeralMgr'

interface SessionProps {
  myName: string | null;
  setMyName: React.Dispatch<React.SetStateAction<string | null>> | null;
  mockServices: SocketIOClient.Socket;
}

interface SessionWrapperProps {
  children: React.ReactNode;
}

const AppContext = createContext({ myName: "", setMyName: null, mockServices: null } as SessionProps);

export const SessionWrapper:React.FunctionComponent<SessionWrapperProps> = (props : SessionWrapperProps) => {
  const [myName, setMyName] = useState(localStorage.getItem("myName"));
  // called twice due to https://reactjs.org/docs/strict-mode.html
  const [mockServices, ] = useState(io(Conf.mockServicesAddr));

  mockServices.on('connect', () => {
	mockServices.emit('broadcast', EphemeralMgr.genId());
  });

  useEffect(() => {
    localStorage.setItem("myName", myName || "");
  }, [myName]);

  return (
    <>
      <AppContext.Provider
        value={{
          myName: myName,
          setMyName: setMyName,
          mockServices: mockServices,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </>
  );
};

export const useSession = () => useContext(AppContext);
