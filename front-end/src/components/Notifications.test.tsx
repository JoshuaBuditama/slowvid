import React from "react";
import { render } from "@testing-library/react";
import Notifications from "./Notifications";

// test("Test warning text", () => {
//   const { getByText } = render(<Notifications />);
//   const warningText = getByText(
//     /You have been in close contact with a person who has COVID-19/
//   );
//   expect(warningText).toBeInTheDocument();
// });

test("Test no new notifications", () => {
  const { getByText } = render(<Notifications />);
  const noNotifications = getByText(
    /No new Notifications./
  );
  expect(noNotifications).toBeInTheDocument();
});
