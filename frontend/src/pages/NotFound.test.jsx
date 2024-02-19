import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import NotFound from "@/pages/NotFound";

// Smoke test
test("Renders without crashing", function () {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>,
  );
});

// Snapshot test
test("Matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
