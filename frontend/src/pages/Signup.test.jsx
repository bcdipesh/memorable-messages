import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import Signup from "@/pages/Signup";

test("Renders without crashing", function () {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>,
  );
});

test("Matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
