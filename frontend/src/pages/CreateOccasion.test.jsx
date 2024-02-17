import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import CreateOccasion from "@/pages/CreateOccasion";

test("Renders without crashing", function () {
  render(
    <BrowserRouter>
      <CreateOccasion />
    </BrowserRouter>,
  );
});

test("Matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <CreateOccasion />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
