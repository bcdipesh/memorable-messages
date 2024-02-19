import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import PrivacyPolicy from "@/pages/PrivacyPolicy";

// Smoke test
test("Renders without crashing", function () {
  render(
    <BrowserRouter>
      <PrivacyPolicy />
    </BrowserRouter>,
  );
});

// Snapshot test
test("Matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <PrivacyPolicy />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
