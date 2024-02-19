import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import Login from "@/pages/Login";

// Smoke test
test("Renders without crashing", function () {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
});

// Snapshot test
test("Matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
