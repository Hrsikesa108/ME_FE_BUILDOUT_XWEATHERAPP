import { useState } from 'react';

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '71947d5a53324a55b7b144755262804'; // Replace with your actual API key

  const fetchWeatherData = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Weather App</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={{ padding: '8px', width: '70%', marginRight: '10px' }}
        />
        <button
          onClick={fetchWeatherData}
          style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Search
        </button>
      </div>
      {loading && <p>Loading data...</p>}
      {error && alert(error)}
      {weatherData && (
        <div className="weather-cards" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '10px' }}>
          <div className="weather-card" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9', width: '150px' }}>
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9', width: '150px' }}>
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9', width: '150px' }}>
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9', width: '150px' }}>
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}
