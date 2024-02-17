import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import UpdateOccasion from "@/pages/UpdateOccasion";

test("Renders without crashing", function () {
  render(
    <BrowserRouter>
      <UpdateOccasion />
    </BrowserRouter>,
  );
});

test("Matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <UpdateOccasion />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
