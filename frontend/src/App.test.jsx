import React from "react";

import { render } from "@testing-library/react";

import App from "./App";

// Smoke test
test("Renders without crashing", function () {
  render(<App />);
});

// Snapshot test
test("Matches snapshot", function () {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
