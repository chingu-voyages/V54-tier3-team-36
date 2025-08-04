import React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction } from "./toast";
import { it, describe, expect } from "@jest/globals";

export const ToastComponent = () => (
  <ToastProvider>
    <Toast data-testid="toast">
      <ToastTitle>Toast Title</ToastTitle>
      <ToastDescription>Toast Description</ToastDescription>
      <ToastClose />
    </Toast>
    <ToastViewport />
  </ToastProvider>
);

describe("Toast component", () => {
  it("renders correctly", () => {
    render(<ToastComponent />);
    const toast = screen.getByTestId("toast");
    expect(toast).toBeInTheDocument();
    expect(screen.getByText("Toast Title")).toBeInTheDocument();
    expect(screen.getByText("Toast Description")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<ToastComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
