// const key = "?api_key=bTf1g1Q2o8yIUAKBFUNwZFotBpUMxecD5efRgfr6";
// const weatherURL =
//     "https://api.nasa.gov/insight_weather/" + key + "&feedtype=json&ver=1.0";

// // Fetch latest Mars weather data
// function fetchWeather() {
//     return fetch(weatherURL)
//         .then((res) => res.json())
//         .then((data) => {
//             const { sol_keys, validity_checks, ...solData } = data;
//             return Object.entries(solData).map(([sol, data]) => {
//                 return {
//                     sol: sol,
//                     maxTemp: data.AT.mx,
//                     minTemp: data.AT.mn,
//                     maxSpeed: data.HWS.mx,
//                     minSpeed: data.HWS.mn,
//                     date: new Date(data.First_UTC),
//                 };
//             });
//         });
// }

async function fetchWeather() {
    const key = "?api_key=bTf1g1Q2o8yIUAKBFUNwZFotBpUMxecD5efRgfr6";
    const url =
        "https://api.nasa.gov/insight_weather/" +
        key +
        "&feedtype=json&ver=1.0";
    try {
        const response = await fetch(url);
        const json = await response.json();
        displayWeather(json);
    } catch (error) {
        console.error(error);

        const errorContainer = document.querySelector(
            ".weather-error-container"
        );

        errorContainer.innerHTML = `
            <p class="error__message">
                I'm sorry Dave, I'm afraid I can't do that.
            </p>
        `;
        // loader.style.display = "none";
    }
}

fetchWeather();

function displayWeather(json) {
    const keys = Object.entries(json);
    console.log(keys);
}
