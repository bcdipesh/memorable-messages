import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import Profile from "@/pages/Profile";

// Smoke test
test("Renders without crashing", function () {
  render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>,
  );
});

// Snapshot test
test("Matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
