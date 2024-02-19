import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import Occasion from "@/pages/Occasion";

// Smoke test
test("Renders without crashing", function () {
  render(
    <BrowserRouter>
      <Occasion />
    </BrowserRouter>,
  );
});

// Snapshot test
test("Matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <Occasion />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
