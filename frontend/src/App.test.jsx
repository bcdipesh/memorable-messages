import React from "react";

import { render } from "@testing-library/react";

import App from "./App";

test("Renders without crashing", function () {
  render(<App />);
});

test("Matches snapshot", function () {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
