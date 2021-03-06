import { render } from "@testing-library/react";
import React from "react";

import { Check } from "../icons";
import { Badge } from ".";

describe("<Table />", () => {
  it("renders", () => {
    const { container } = render(<Badge />);
    expect(container).toMatchSnapshot();
  });
  it("renders with correct styles and icon", () => {
    const { container } = render(<Badge icon={Check} variant="secondary" />);
    expect(container).toMatchSnapshot();
  });
});
