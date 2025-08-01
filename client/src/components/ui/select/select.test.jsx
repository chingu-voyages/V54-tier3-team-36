import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "./select";
import { it, describe, expect } from "@jest/globals";

const SelectComponent = () => (
  <Select>
    <SelectTrigger aria-label="Select an option" data-testid="select-trigger">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
    </SelectContent>
  </Select>
);

describe("Select component", () => {
  it("renders trigger correctly", () => {
    render(<SelectComponent />);
    const trigger = screen.getByTestId("select-trigger");
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent("Select an option");
  });

  it("opens dropdown when trigger is clicked, selects an option and closes dropdown", () => {
    render(<SelectComponent />);
    const trigger = screen.getByTestId("select-trigger");

    fireEvent.click(trigger);
    const option1 = screen.getByText("Option 1");
    expect(option1).toBeInTheDocument();
    fireEvent.click(option1);
    expect(trigger).toHaveTextContent("Option 1");
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();

    fireEvent.click(trigger);
    const option2 = screen.getByText("Option 2");
    expect(option2).toBeInTheDocument();
    fireEvent.click(option2);
    expect(trigger).toHaveTextContent("Option 2");
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<SelectComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
