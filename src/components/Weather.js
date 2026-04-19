import { useEffect, useCallback, useState } from "react";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Chennai");

  const getWeather = useCallback(async () => {
    try {
      const API_KEY = "YOUR_API_KEY"; // replace with your OpenWeather key

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.log("Error fetching weather:", error);
    }
  }, [city]);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Weather App 🌤️</h2>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />

      <button onClick={getWeather}>Search</button>

      {weather && weather.main && (
        <div>
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;