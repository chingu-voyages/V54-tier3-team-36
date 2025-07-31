import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Input } from "./input";
import { it, describe, expect } from "@jest/globals";

describe("Input component", () => {
  it("renders correctly", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toBeInTheDocument();
  });

  it("accepts text input", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "Testing with Jest" } });
    expect(input.value).toBe("Testing with Jest");
  });

  it("accepts email input", () => {
    render(<Input data-testid="input" type="email" />);
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "test@example.io" } });
    expect(input.value).toBe("test@example.io");
  });

  it("accepts password input", () => {
    render(<Input data-testid="input" type="password" />);
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "password" } });
    expect(input.value).toBe("password");
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Input aria-label="Test input" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
