import React from "react";
import styled from "styled-components";

let Smartphone = styled.div`
  /* The device with borders */
  position: relative;
  width: 360px;
  height: 640px;
  margin: auto;
  margin-top: 10px;
  border: 16px black solid;
  border-top-width: 60px;
  border-bottom-width: 60px;
  border-radius: 36px;

  /* The horizontal line on the top of the device */
  :before {
    content: "";
    display: block;
    width: 60px;
    height: 5px;
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #333;
    border-radius: 10px;
  }

  /* The circle on the bottom of the device */
  :after {
    content: "";
    display: block;
    width: 35px;
    height: 35px;
    position: absolute;
    left: 50%;
    bottom: -65px;
    transform: translate(-50%, -50%);
    background: #333;
    border-radius: 50%;
  }
`;

let SmartphoneContent = styled.div`
  background: white;
  overflow: auto;
  width: 328px;
  height: 520px;
`;

export interface LayoutProps {
  children: React.ReactNode;
}

function DeviceMock(props: LayoutProps) {
  return (
    <Smartphone>
      <SmartphoneContent>{props.children}</SmartphoneContent>
    </Smartphone>
  );
}

export default DeviceMock;
