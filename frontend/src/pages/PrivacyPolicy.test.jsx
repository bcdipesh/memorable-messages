import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import PrivacyPolicy from "@/pages/PrivacyPolicy";

test("Renders without crashing", function () {
  render(
    <BrowserRouter>
      <PrivacyPolicy />
    </BrowserRouter>,
  );
});

test("Matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <PrivacyPolicy />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
