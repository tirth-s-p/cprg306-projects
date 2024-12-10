"use client";

import MainNavbar from "../components/MainNavbar";
import SecondaryNavbar from "../components/SecondaryNavbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col min-h-screen">
      {/* Main Navbar */}
      <MainNavbar />
      {/* Secondary Navbar */}
      <SecondaryNavbar />

      {/* Main Content */}
      <div className="flex-grow p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-6">
            About WeatherWise
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to WeatherWise, your trusted companion for weather updates.
            Whether you're planning your day, organizing a trip, or simply curious
            about the forecast, WeatherWise delivers accurate and up-to-date weather
            information tailored to your needs. With our user-friendly interface and
            powerful weather data, staying informed has never been easier!
          </p>

          {/* Decorative Divider */}
          <div className="my-8 border-t-4 border-blue-500 w-16 mx-auto"></div>

          {/* Developer Info Section */}
          <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 rounded-lg p-6 mb-8 shadow-inner">
            <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">
              Developer Information
            </h2>
            <p className="text-center text-gray-800">
              <strong>Developer:</strong> Tirth Patel
            </p>
            <div className="mt-4">
              <h3 className="text-xl font-medium text-blue-600 text-center mb-2">
                Technologies Used
              </h3>
              <ul className="list-none grid grid-cols-2 gap-4 text-gray-700 text-center">
                <li className="p-3 rounded-lg bg-blue-50 shadow-sm">
                  <strong>React (Next.js)</strong>
                </li>
                <li className="p-3 rounded-lg bg-blue-50 shadow-sm">
                  <strong>OpenWeatherMap API</strong>
                </li>
                <li className="p-3 rounded-lg bg-blue-50 shadow-sm">
                  <strong>Tailwind CSS</strong>
                </li>
                <li className="p-3 rounded-lg bg-blue-50 shadow-sm">
                  <strong>Vercel</strong>
                </li>
                <li className="p-3 rounded-lg bg-blue-50 shadow-sm">
                  <strong>JavaScript</strong>
                </li>
                <li className="p-3 rounded-lg bg-blue-50 shadow-sm">
                  <strong>Geolocation API</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-blue-50 rounded-lg p-6 shadow-inner">
            <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-center">
              At WeatherWise, our mission is to empower users with reliable and
              accessible weather forecasts. We believe in providing data that
              helps you stay prepared, make informed decisions, and live your
              life without weather surprises. Thank you for making us part of
              your daily routine.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
