import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import Home from "@/pages/Home";

// Smoke test
test("Renders without crashing", function () {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  );
});

// Snapshot test
test("Matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
