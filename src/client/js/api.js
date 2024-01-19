/* Global Variables */
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?`;
const geoURL = `http://api.openweathermap.org/geo/1.0/zip?`;
const apiKey = '188388cac3018bd04ce69ff048bcd813';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// fetch geo data
const getGeoData = async (baseURL, zip, apiKey) => {
    const res = await fetch(`${baseURL}zip=${zip},US&appid=${apiKey}`)
    try {
        return await res.json();
    } catch (error) {
        console.log("error", error);
    }
}

// fetch weather data
const getWeatherData = async (baseURL, lat, lon, apiKey) => {
    const res = await fetch(`${baseURL}lat=${lat}&lon=${lon}&appid=${apiKey}`)
    try {
        return await res.json();
    } catch (error) {
        console.log("error", error);
    }
}

// update UI
const updateUI = async (weatherData) => {
    try {
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(weatherData.main.temp)+ 'degrees';
        document.getElementById('date').innerHTML = newDate;
    }
    catch(error) {
        console.log("error", error);
    }
}

// event for generate click
// document.getElementById('generate').addEventListener('click', generate);

function generate() {
    const zip = document.getElementById('zip').value;

    getGeoData(geoURL, zip, apiKey)
        .then(
            (geoData) => {
                return getWeatherData(weatherURL, geoData.lat, geoData.lon, apiKey);
            }
        )
        .then(
            (weatherData) => {
                console.log(weatherData)
                updateUI(weatherData);
            }
        )
}

export { generate }