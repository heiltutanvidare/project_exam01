const baseUrl = "http://api.open-notify.org/astros.json";
const corsEnabled = "https://noroffcors.herokuapp.com/";
const url = corsEnabled + baseUrl;
const loader = document.querySelector(".loader");
const errorContainer = document.querySelector(
    ".peopleInSpace__error__container"
);

async function fetchAstronauts() {
    try {
        // use await when calling fetch
        const response = await fetch(url);
        // use await when resolving the returned value, which is a promise
        const json = await response.json();
        // pass the array of astronauts to the displayAstronauts function
        displayAstronauts(json);
        loader.style.display = "none";
    } catch (error) {
        console.log(error);
        errorContainer.innerHTML = `
        <p class="error__message">
            Houston, we have a problem…
        </p>
    `;
    }
}

// call the fetchAstronaus function
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
                    <p class="astronaut__heading">Astronaut:</p>
                    <p class="astronaut__name">${astronauts[i].name}</p>
                    <p class="astronaut__craft">On board the ${astronauts[i].craft}</p>
                </div>`;
    }

    // assign the new HTML string to the innerHTML property of astronautContainer
    astronautContainer.innerHTML = html;
}
