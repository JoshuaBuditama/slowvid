import React, { useState } from "react";
import { useSession } from "../state";

function NameForm() {
  const [name, setName] = useState("");
  const { setMyName } = useSession();

  function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (setMyName != null)
    {
      setMyName(name);
    }
  }

  function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
    console.log(event);
    setName(event.target.value);
  }

  return (
    <div style={{ padding: "10px", border: "1px solid white" }}>
      <p>
        This is a demo form that will store your name in app state and your
        browser's local storage.
      </p>
      <p>
        When you click submit your name should appear in the footer, and stay
        there even after page refresh.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder={"Enter your name"}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
export default NameForm;
