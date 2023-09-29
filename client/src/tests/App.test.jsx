import { render, screen } from "@testing-library/react";
import { it, describe, expect, vi } from "vitest";
import App from "../App";

global.fetch = vi.fn();
test("expect App to render", () => {
  render(<App />);
  const title = screen.getByText("Weather App");

  expect(title).toBeDefined();
});
