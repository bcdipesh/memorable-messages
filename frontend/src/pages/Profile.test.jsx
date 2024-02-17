import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import Profile from "@/pages/Profile";

test("Renders without crashing", function () {
  render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>,
  );
});

test("Matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
