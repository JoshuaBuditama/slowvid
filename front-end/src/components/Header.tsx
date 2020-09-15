import React from "react";
import { useSession } from "../state";

let style = {
  width: "100%",
  backgroundColor: "blue",
  marginTop: "0px",
  padding: "20px",
  marginBottom: "20px"
};

function Header() {
  const { myName } = useSession();
  return (
    <div style={style}>
      Your name is: <span style={{ color: "red" }}>{myName}</span>
    </div>
  );
}
export default Header;
