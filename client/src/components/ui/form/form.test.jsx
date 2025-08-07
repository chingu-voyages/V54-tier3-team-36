import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "./form";
import { useForm } from "react-hook-form";
import { it, describe, expect, beforeAll } from "@jest/globals";

beforeAll(() => {
  if (!HTMLFormElement.prototype.requestSubmit) {
    HTMLFormElement.prototype.requestSubmit = function () {
      this.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }))
    }
  }
})

const FormComponent = () => {
  const methods = useForm({
    defaultValues: {
      username: "",
    },
  })

  return (
    <Form {...methods}>
      <form data-testid="form" onSubmit={methods.handleSubmit(() => { })}>
        <FormField
          name="username"
          control={methods.control}
          rules={{ required: "Username is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <input
                  data-testid="username-input"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter your username</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  )
}

describe("Form component", () => {
  it("renders correctly", () => {
    render(<FormComponent />);
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByText("Enter your username")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("accepts valid input", () => {
    render(<FormComponent />);
    const input = screen.getByTestId("username-input");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
  });

  it("shows error message when required field is empty", async () => {
    render(<FormComponent />);
    fireEvent.click(screen.getByText("Submit"));
    const errorMessage = await screen.findByText("Username is required")
    expect(errorMessage).toBeInTheDocument()
  });

  it("has no a11y violations", async () => {
    const { container } = render(<FormComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
