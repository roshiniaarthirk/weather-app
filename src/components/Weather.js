import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "2fbeee69f2c54993b1a51821261904";

  const getWeather = async () => {
    try {
      setLoading(true);

      const query = city ? city : "11.1035,79.6550";

      const res = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`
      );

      setData(res.data);
      setError("");
    } catch (err) {
      setError("City not found ❌");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  // 🌈 Dynamic background logic
  const getWeatherClass = () => {
    if (!data) return "";

    if (data.current.is_day === 0) return "night";

    const condition = data.current.condition.text.toLowerCase();

    if (condition.includes("sun")) return "sunny";
    if (condition.includes("cloud")) return "cloudy";
    if (condition.includes("rain")) return "rain";
    if (condition.includes("mist")) return "mist";

    return "";
  };

  return (
    <div className={`container ${getWeatherClass()}`}>
      
      {/* ⭐ Stars only at night */}
      {data?.current.is_day === 0 && <div className="stars"></div>}

      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
        🌤 Weather App
      </h1>

      {/* Search */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {loading && <p>Loading... ⏳</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="card">
          <h2>
            {data.location.name}, {data.location.region}
          </h2>

          <img src={data.current.condition.icon} alt="weather icon" />

          <p>🌡 Temp: {data.current.temp_c} °C</p>
          <p>🌥 {data.current.condition.text}</p>
          <p>💧 Humidity: {data.current.humidity}%</p>
          <p>🌬 Wind: {data.current.wind_kph} kph</p>
        </div>
      )}
    </div>
  );
}

export default Weather;