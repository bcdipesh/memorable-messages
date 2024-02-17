import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import NotFound from "@/pages/NotFound";

test("Renders without crashing", function () {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>,
  );
});

test("Matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
