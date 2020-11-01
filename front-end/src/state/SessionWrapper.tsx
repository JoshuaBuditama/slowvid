import React, { createContext, useContext, useState, useEffect } from "react";
import io from 'socket.io-client';
import * as Conf from '../Conf';
import * as EphemeralMgr from '../security_privacy/EphemeralMgr';
import * as LocalStorage from './LocalStorage';
import { IBluetoothMsgWithSignalStrength } from '../../../bluetooth-back-end/src/model/BluetoothMsgModel';
import axios, {AxiosInstance} from 'axios';
//import {setCommentRange } from "typescript";

interface SessionProps {
  consentProvided: boolean;
  setConsentProvided: React.Dispatch<React.SetStateAction<boolean | null>> | null;
  mockServices: SocketIOClient.Socket;
  closeContactFlag: boolean;
}

interface SessionWrapperProps {
  children: React.ReactNode;
}

const AppContext = createContext({ mockServices: null, setConsentProvided: null, consentProvided: null,
  closeContactFlag: false} as SessionProps);

export const SessionWrapper:React.FunctionComponent<SessionWrapperProps> = (props : SessionWrapperProps) => {
  const [consentProvided, setConsentProvided] = useState(localStorage.getItem("consentProvided")==='true');
  const [closeContactFlag, setCloseContactFlag] = useState(false);
  // called twice due to https://reactjs.org/docs/strict-mode.html
  const [mockServices, ] = useState(io(Conf.mockServicesAddr, {
    reconnection: Conf.bluetoothReconnection,
  }));

  const keyPairUpload = EphemeralMgr.genKeyPair();
  const keyPairQuery = EphemeralMgr.genKeyPair();
  if (Conf.clearLocalStorageOnStartup) {
    localStorage.removeItem('uploadTable')
    localStorage.removeItem('queryTable')
  }
  mockServices.on('connect', () => {
    mockServices.emit('broadcast', JSON.stringify([EphemeralMgr.getId(keyPairUpload), EphemeralMgr.getId(keyPairQuery)]));
    setInterval(() => {
      mockServices.emit('broadcast', JSON.stringify([EphemeralMgr.getId(keyPairUpload), EphemeralMgr.getId(keyPairQuery)]));
    }, Conf.bluetoothBroadcastPeriodMilliseconds);
  });
  mockServices.on('broadcast', (data: IBluetoothMsgWithSignalStrength) => {
    let foreignEmphIds : string[] = JSON.parse(data.latestMsg);
    if (keyPairUpload && foreignEmphIds.length > 1) {
      const ecounterToken = EphemeralMgr.genEncounterToken(keyPairUpload, foreignEmphIds[1]);
      const uploadTableRaw = localStorage.getItem('uploadTable');
      const uploadTable = LocalStorage.updateUploadTable(uploadTableRaw, ecounterToken, data.signalStrenth);
      localStorage.setItem('uploadTable', JSON.stringify(uploadTable));
    }
    if (keyPairQuery && foreignEmphIds.length > 1) {
      const ecounterToken = EphemeralMgr.genEncounterToken(keyPairQuery, foreignEmphIds[0]);
      const queryTableRaw = localStorage.getItem('queryTable');
      const queryTable = LocalStorage.updateQueryTable(queryTableRaw, ecounterToken);
      localStorage.setItem('queryTable', JSON.stringify(queryTable));
    }
  });

  const http: AxiosInstance = axios.create({baseURL: Conf.backendAddr});
  setInterval(async () => {
    const res = await http.post<boolean>('/closeContactFlag', {deviceId: Conf.deviceId});
    setCloseContactFlag(res.data);
  }, Conf.checkCloseContactFlagPeriodMilliseconds);

  useEffect(() => {
    localStorage.setItem("consentProvided", consentProvided===true ? 'true' : 'false');
  }, [consentProvided]);

  return (
    <>
      <AppContext.Provider
        value={{
          consentProvided: consentProvided,
          setConsentProvided: setConsentProvided,
          mockServices: mockServices,
          closeContactFlag: closeContactFlag,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </>
  );
};

export const useSession = () => useContext(AppContext);
