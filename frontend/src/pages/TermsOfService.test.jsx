import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import TermsOfService from "@/pages/TermsOfService";

// Smoke test
test("Renders without crashing", function () {
  render(
    <BrowserRouter>
      <TermsOfService />
    </BrowserRouter>,
  );
});

// Snapshot test
test("Matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <TermsOfService />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
