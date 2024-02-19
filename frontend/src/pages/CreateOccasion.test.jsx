import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import CreateOccasion from "@/pages/CreateOccasion";

// Smoke test
test("Renders without crashing", function () {
  render(
    <BrowserRouter>
      <CreateOccasion />
    </BrowserRouter>,
  );
});

// Snapshot test
test("Matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <CreateOccasion />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
