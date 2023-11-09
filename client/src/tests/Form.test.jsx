import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Form from "../components/Form";

describe("Form Component", () => {
  it("renders get weather button", () => {
    render(<Form setUserFavorites={() => {}} />);
    const buttonElement = screen.getByRole("button", { name: /Get Weather/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
