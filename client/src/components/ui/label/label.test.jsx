import React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Label } from "./label";
import { it, describe, expect } from "@jest/globals";

describe("Label component", () => {
  it("renders correctly and can be checked", () => {
    render(<Label data-testid="label">Label Text</Label>);
    const label = screen.getByTestId("label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Label Text");
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Label htmlFor="input-id">Label Text</Label>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
