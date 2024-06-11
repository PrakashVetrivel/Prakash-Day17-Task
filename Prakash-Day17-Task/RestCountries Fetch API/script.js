document.addEventListener('DOMContentLoaded', () => {
    const countriesContainer = document.getElementById('countries-container');
    const weatherApiKey = '82ebaf90bb1aa91e3937d8e3bac5c26b'; // Replace with your actual OpenWeatherMap API key

    fetch('https://restcountries.com/v2/all')
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                const card = document.createElement('div');
                card.className = 'col-lg-4 col-sm-12 mb-4';

                card.innerHTML = `
                    <div class="card">
                        <div class="card-header">
                            ${country.name}
                        </div>
                        <div class="card-body">
                            <img src="${country.flags.png}" class="card-img-top mb-2" alt="Flag of ${country.name}">
                            <p><strong>Capital:</strong> ${country.capital}</p>
                            <p><strong>Region:</strong> ${country.region}</p>
                            <p><strong>Country Code:</strong> ${country.alpha3Code}</p>
                            <button class="btn btn-primary" onclick="getWeather('${country.capital}', '${country.alpha2Code}', this)">Click for Weather</button>
                            <div class="weather-info mt-2"></div>
                        </div>
                    </div>
                `;

                countriesContainer.appendChild(card);
            });
        });

    window.getWeather = function(capital, countryCode, button) {
        const weatherInfoDiv = button.nextElementSibling;
        weatherInfoDiv.innerHTML = 'Loading weather data...';

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital},${countryCode}&appid=${weatherApiKey}&units=metric`;

        console.log(`Fetching weather data from: ${apiUrl}`); // Log the API request URL

        fetch(apiUrl)
            .then(response => response.json())
            .then(weather => {
                console.log('API Response:', weather); // Log the API response

                if (weather.cod === 200) {
                    weatherInfoDiv.innerHTML = `
                        <p><strong>Temperature:</strong> ${weather.main.temp} °C</p>
                        <p><strong>Weather:</strong> ${weather.weather[0].description}</p>
                        <p><strong>Wind Speed:</strong> ${weather.wind.speed} m/s</p>
                    `;
                } else {
                    weatherInfoDiv.innerHTML = `<p>Weather data not available for ${capital}</p>`;
                }
            })
            .catch(error => {
                weatherInfoDiv.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
                console.error('Fetch Error:', error); // Log any fetch errors
            });
    };
});
