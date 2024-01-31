# Weather App

This is a simple weather application built using Vite, React, and the [OpenWeatherMap](https://openweathermap.org/) API. It allows users to search for weather information by city name and view the current weather as well as the forecast.

## Features

- Search for weather information by city name
- View current weather data including temperature, humidity, and wind speed
- Toggle between Celsius and Fahrenheit temperature units
- Display forecast data for the next few days

## Technologies Used

- **Vite**: A fast build tool that leverages modern JavaScript features like ES modules.
- **React**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for making requests to the OpenWeatherMap API.
- **React Hot Toast**: A toast notification library for React applications.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Amitpandey992/weather-app.git
   cd weather-app
   npm install
2. Get an API key:

   Obtain an API key from [OpenWeatherMap](https://openweathermap.org/) by signing up for an account.

3. Set up environment variables:
   
   Create a .env file in the root directory and add your API key:
    ```VITE_API_KEY=your_openweathermap_api_key```

5. Run the application:
   ```npm run dev```


## Usage
- Enter the name of a city in the input field and click "Search City" to view its weather information.
- Toggle between Celsius and Fahrenheit temperature units by clicking the "Convert to °F" or "Convert to °C" button.
- View the forecast data by scrolling down after retrieving weather information for a city.

