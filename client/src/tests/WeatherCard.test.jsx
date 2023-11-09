import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import WeatherCard from "../components/WeatherCard";

const mockUser = { name: "Cathy" };
const mockWeatherData = {
  name: "LA",
  main: {
    temp: 70,
  },
  weather: [{ description: "clear sky" }],
};

describe("<WeatherCard />", () => {
  it('renders the "Add to favorites" button', () => {
    render(
      <WeatherCard
        data={mockWeatherData}
        setShowWeatherCard={() => {}}
        setUserFavorites={() => {}}
        userInfo={mockUser}
      />
    );

    expect(screen.getByText(`Add to Cathy's favorites`)).toBeInTheDocument();
  });

  it("renders error message when no city data is present", () => {
    render(
      <WeatherCard data={{ message: "No such city" }} userInfo={mockUser} />
    );

    expect(
      screen.getByText("No such city. Please enter a valid city")
    ).toBeInTheDocument();
  });
});
