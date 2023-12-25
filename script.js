let APIkeyLoc = "199fddd3e94b69744b3bc7e10bc5a917";
let APIkeyWea = "199fddd3e94b69744b3bc7e10bc5a917";
let lat = null;
let lon = null;
let cityname = "DELHI";
let temperatureCelsius;

// Example API endpoint
let apiUrlLoc = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&appid=${APIkeyLoc}`;

// Get the current date
const currentDate = new Date();

// Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
const dayOfWeek = currentDate.getDay();

// An array of day names for reference
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

// Get the name of the current day
const currentDay = dayNames[dayOfWeek];
let first = document.querySelector("#firstday");
first.innerHTML = dayNames[(dayOfWeek + 8) % 7];

let second = document.querySelector("#secondday");
second.innerHTML = dayNames[(dayOfWeek + 9) % 7];

let third = document.querySelector("#thirdday");
third.innerHTML = dayNames[(dayOfWeek + 10) % 7];

// Define an async function to make the API call
async function fetchData(apiurladd) {
  try {
    // Make a GET request using fetch
    const response = await fetch(apiurladd);

    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data
    const data = await response.json();

    return data;
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
  }
}

async function main() {
  try {
    // Fetch location data
    const dataloc = await fetchData(apiUrlLoc);

    // Extract latitude and longitude
    lat = dataloc[0].lat;
    lon = dataloc[0].lon;

    console.log(lat, lon);

    // Use latitude and longitude to fetch weather data
    const apiUrlWea = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkeyWea}`;

    // Call the weather data fetching logic inside the then block
    fetchData(apiUrlWea).then((dataWea) => {
      // Access temperature from the weather data in Kelvin
      console.log(dataWea);
      const temperatureKelvin = dataWea.main.temp;
      const humidity = dataWea.main.humidity;
      const windSpeed = dataWea.wind.speed;

      // Convert temperature to Celsius
      temperatureCelsius = temperatureKelvin - 273.15;

      //temperature update in html
      const temp = document.querySelector("#temperature");
      temp.innerHTML = temperatureCelsius.toFixed(2);
      //

      //

      let location = document.querySelector("#location");
      location.innerHTML = cityname;

      //
      let humidityNo = document.querySelector("#humidityNo");
      humidityNo.innerHTML = humidity;
      //
      let windSpeedhtml = document.querySelector("#windSpeed");
      windSpeedhtml.innerHTML = windSpeed;

      //

      console.log(
        "Temperature in Celsius:",
        temperatureCelsius.toFixed(2),
        dataWea
      );
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Call the main function

document.getElementById("searchButton").addEventListener("click", function () {
  search();
});
function search() {
  // Get the value from the search input
  cityname = document.getElementById("searchInput").value;

  // Do something with the search input value
  console.log("Search input value:", cityname);
   apiUrlLoc = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&appid=${APIkeyLoc}`;


  // Add further logic, such as making an API request or processing the input
  main();
}
