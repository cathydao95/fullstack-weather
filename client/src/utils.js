export const getWeatherForLocation = async (city) => {
  const response = await fetch(
    `http://localhost:8080/api/weather?city=${city}`
  );
  const weatherData = await response.json();
  return weatherData;
};
