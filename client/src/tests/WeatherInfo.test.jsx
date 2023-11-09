import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WeatherInfo from "../components/WeatherInfo";

describe("WeatherInfo Component", () => {
  it("displays weather data", () => {
    // Mock weather data to pass as a prop
    const mockWeatherData = {
      name: "Los Angeles",
      main: {
        temp: "75",
        temp_max: "81",
        temp_min: "68",
      },
      weather: [
        {
          description: "clear sky",
          icon: "url",
        },
      ],
    };

    // Render WeatherInfo Icon and test that weather info is displayed
    render(<WeatherInfo weatherData={mockWeatherData} />);

    expect(screen.getByText(/los angeles/i)).toBeInTheDocument();
    expect(screen.getByText(/75/)).toBeInTheDocument();
    expect(screen.getByText(/clear sky/)).toBeInTheDocument();
    expect(screen.getByText(/81/)).toBeInTheDocument();
    expect(screen.getByText(/68/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "" })).toHaveAttribute(
      "src",
      `https://openweathermap.org/img/w/${mockWeatherData.weather[0].icon}.png`
    );
  });
});
