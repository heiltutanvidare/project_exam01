// The base utr used http and not https, causing the browser to block it.
// A cors-enabled URL will fix this
const baseUrl = "http://api.open-notify.org/astros.json";
const corsEnabled = "https://noroffcors.herokuapp.com/";
const url = corsEnabled + baseUrl;

const loader = document.querySelector(".loader");
const errorContainer = document.querySelector(
    ".peopleInSpace__error__container"
);

async function fetchAstronauts() {
    try {
        const response = await fetch(url);
        const json = await response.json();
        displayAstronauts(json);
        loader.style.display = "none";
    } catch (error) {
        console.error(error);
        errorContainer.innerHTML = `
        <p class="error__message">
            Houston, we have a problem…
        </p>
    `;
    }
}

// call the function to fetch astronaus
fetchAstronauts();

function displayAstronauts(json) {
    // declare a variable for the astronauts
    const astronauts = json.people;
    // select the element where we will attach the HTML we create
    const astronautContainer = document.querySelector(".astronauts");
    // select the element where the number of astronauts will be displayed
    const numberContainer = document.querySelector(".numberOfPeople");
    // assign the number as innertext for the numberContainer
    numberContainer.innerText = json.number;

    // declare a variable to hold the HTML we will create
    let html = "";

    // loop through each astronaut using a for loop
    for (let i = 0; i < astronauts.length; i++) {
        // add the new HTML string to the existing HTML string
        html += `<div class="astronaut">
                    <i class="fas fa-user-astronaut"></i>
                    <p class="astronaut__heading">Astronaut</p>
                    <p class="astronaut__name">${astronauts[i].name}</p>
                    <p class="astronaut__craft">on board the ${astronauts[i].craft}</p>
                </div>`;
    }

    // assign the new HTML string to the innerHTML property of astronautContainer
    astronautContainer.innerHTML = html;
}
