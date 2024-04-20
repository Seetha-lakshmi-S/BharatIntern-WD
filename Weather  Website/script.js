// Function to convert country code to name
function convertCountryCode(countryCode) {
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(countryCode);
}

async function getWeatherData() {
    var inputVal = document.getElementById("searchTxt").value;

    if (!inputVal) {
        alert("Please enter a city name");
        return;
    }

    const apiKey = "89d98736e1d8a522f7dc0dd318202d2b"; // Replace with your OpenWeatherMap API key

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=metric&appid=${apiKey}`
    );

    const data = await res.json();
    if (data.cod && data.cod !== 200) {
        alert("City not found");
        return;
    }

    // Set the city name above the hr line
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("cityName").style.display = "block"; // Display the city name

    // Set the country name
    const countryCode = data.sys.country;
    const countryName = convertCountryCode(countryCode);

    // Display country and date information
    const formattedDate = new Date(data.dt * 1000).toLocaleDateString();
    document.getElementById("locationParts").innerText = `Country: ${countryName}`;
    document.getElementById("locationParts").style.display = "block"; // Display the country 
    document.getElementById("date").innerText = `Date: ${formattedDate}`;
    
    document.getElementById("txtWord").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById("temperatureC").innerText = `${data.main.temp.toFixed(2)} °C`;
    document.getElementById("temperatureF").innerText = `${((data.main.temp * 9 / 5) + 32).toFixed(2)} °F`;
    document.getElementById("wind").innerText = `Wind Speed: ${data.wind.speed} m/s`;

    // Set weather icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    document.getElementById("weatherIcon").src = iconUrl;

    // Hide placeholder image and text
    document.getElementById("placeholderImage").style.display = "none";
    // Show weather details
    document.getElementById("weatherDetails").style.display = "block";
    // Show weather icon
    document.getElementById("weatherIcon").style.display = "block";
    // Show the separator span
    document.querySelector(".separator").style.display = "inline";
}
