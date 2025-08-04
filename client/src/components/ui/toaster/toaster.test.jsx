import React from "react";
import { render, screen } from "@testing-library/react";
import { it, describe, expect, afterEach, jest } from "@jest/globals";
import { Toaster } from "./toaster";
import { useToast } from "../../../hooks/use-toast";
import { axe } from "jest-axe";

jest.mock("../../../hooks/use-toast", () => ({
  useToast: jest.fn(),
}));

describe("Toaster component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders no toast when toasts array is empty", () => {
    useToast.mockReturnValue({ toasts: [] });
    const { container } = render(<Toaster />);
    expect(container).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders a toast with title and description", () => {
    useToast.mockReturnValue({
      toasts: [
        {
          id: "1",
          title: "Success",
          description: "Completed successfully.",
        },
      ],
    });

    render(<Toaster />);
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Completed successfully.")).toBeInTheDocument();
  });

  it("renders a toast with action", () => {
    const mockAction = <button>Undo</button>;

    useToast.mockReturnValue({
      toasts: [
        {
          id: "2",
          title: "Deleted",
          description: "Deleted successfully.",
          action: mockAction,
        },
      ],
    });

    render(<Toaster />);
    expect(screen.getByText("Deleted")).toBeInTheDocument();
    expect(screen.getByText("Deleted successfully.")).toBeInTheDocument();
    expect(screen.getByText("Undo")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Toaster />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
