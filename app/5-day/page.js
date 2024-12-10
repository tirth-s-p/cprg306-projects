"use client";

import { useState, useEffect } from "react";
import MainNavbar from "../components/MainNavbar";
import SecondaryNavbar from "../components/SecondaryNavbar";
import Footer from "../components/Footer";

export default function FiveDay() {
  const [forecastData, setForecastData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Calgary"); // Default city
  const [selectedDayDetails, setSelectedDayDetails] = useState(null); // For modal
  const [error, setError] = useState("");

  // Fetch 5-day forecast data
  const fetchFiveDayForecast = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );

      if (!res.ok) throw new Error("Unable to fetch forecast data.");
      const data = await res.json();

      // Group forecast by day and simplify structure
      const dailyData = [];
      data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0]; // Extract date (YYYY-MM-DD)
        if (!dailyData.some((day) => day.date === date)) {
          dailyData.push({
            date,
            temp: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            windSpeed: item.wind.speed,
            humidity: item.main.humidity,
            pressure: item.main.pressure,
            visibility: item.visibility / 1000, // Convert from meters to km
          });
        }
      });

      setForecastData(dailyData.slice(0, 5)); // Take the first 5 days
      setError("");
    } catch (err) {
      setError("Unable to load forecast data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchFiveDayForecast(selectedCity); // Fetch data for the default city or the searched city
  }, [selectedCity]);

  const handleCitySearch = (city) => {
    setSelectedCity(city); // Update the selected city when searched
  };

  const handleExpand = (day) => {
    setSelectedDayDetails(day); // Open modal with selected day's details
  };

  const closePrompt = () => {
    setSelectedDayDetails(null); // Close the modal
  };

  const generateSuggestions = (day) => {
    const suggestions = [];
    if (day.temp > 30) {
      suggestions.push("Stay hydrated and avoid outdoor activities during peak sun hours.");
    }
    if (day.temp < 5) {
      suggestions.push("Dress warmly and watch out for slippery surfaces.");
    }
    if (day.description.includes("rain")) {
      suggestions.push("Carry an umbrella and wear waterproof shoes.");
    }
    if (day.windSpeed > 20) {
      suggestions.push("Be cautious of strong winds; secure outdoor items.");
    }
    if (suggestions.length === 0) {
      suggestions.push("Weather looks great! Enjoy your day.");
    }
    return suggestions;
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col min-h-screen">
      {/* Main Navigation */}
      <MainNavbar onSearch={handleCitySearch} />
      <SecondaryNavbar />

      {/* Main Content */}
      <div className="flex-grow p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">5-Day Weather Forecast</h1>
        <p className="text-lg text-gray-700 mb-8">
          Plan ahead with 5-day weather forecasts for{" "}
          <strong>{selectedCity}</strong>. Use the search bar to explore upcoming weather
          conditions for any location.
        </p>

        {error && <p className="text-red-500 mb-8">{error}</p>}

        {/* Forecast Boxes */}
        <div className="grid grid-cols-5 gap-4">
          {forecastData.map((day, index) => (
            <div
              key={index}
              className={`p-4 bg-white shadow-md rounded-lg relative ${
                index === 0 ? "border-2 border-blue-500" : ""
              }`}
            >
              <h2 className="text-xl font-bold mb-2">{index === 0 ? "Today" : day.date}</h2>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
                className="mx-auto mb-4"
              />
              <p className="text-lg font-medium text-gray-700">
                {Math.round(day.temp)}°C
              </p>
              <p className="text-gray-600 capitalize">{day.description}</p>

              {/* Expand Icon */}
              <button
                onClick={() => handleExpand(day)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                title="Expand Details"
              >
                ➕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Weather Modal */}
      {selectedDayDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/2 shadow-lg relative">
            <button
              onClick={closePrompt}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
              title="Close"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedDayDetails.date}</h2>
            <div className="flex items-center justify-center mb-6">
              <img
                src={`https://openweathermap.org/img/wn/${selectedDayDetails.icon}@2x.png`}
                alt={selectedDayDetails.description}
                className="w-24 h-24"
              />
              <div className="ml-6">
                <p className="text-4xl font-bold">{Math.round(selectedDayDetails.temp)}°C</p>
                <p className="text-lg text-gray-700 capitalize">{selectedDayDetails.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-left">
              <p>
                <strong>Wind Speed:</strong> {selectedDayDetails.windSpeed} km/h
              </p>
              <p>
                <strong>Humidity:</strong> {selectedDayDetails.humidity}%
              </p>
              <p>
                <strong>Pressure:</strong> {selectedDayDetails.pressure} mb
              </p>
              <p>
                <strong>Visibility:</strong> {selectedDayDetails.visibility} km
              </p>
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-2">Suggestions:</h3>
            <ul className="list-disc list-inside text-left text-gray-700">
              {generateSuggestions(selectedDayDetails).map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
