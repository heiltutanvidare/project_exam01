// Fetch the upcomming launches
// and display as HTML on homepage

const url = "https://api.spacexdata.com/v4/launches/upcoming";
const errorContainer = document.querySelector(".launches-error-container");
const loader = document.querySelector(".launches-loader");

// Fetch upcomming SpaceX launches
async function fetchLaunches() {
    try {
        const response = await fetch(url);
        const launches = await response.json();
        displayLaunches(launches);
    } catch (error) {
        console.error(error);
        errorContainer.innerHTML = `
            <p class="error__message">
                Houston, we have a problem…
            </p>
        `;
        // loader.style.display = "none";
    }
}

fetchLaunches();

function displayLaunches(launches) {
    const container = document.querySelector(".launches-container");
    let html = "";

    for (let i = 0; i < 1; i++) {
        const flightNo = launches[i].flight_number;
        const date = new Date(launches[i].date_utc).toDateString();
        const launchName = launches[i].name;
        let description = launches[i].details;
        let redditLink = launches[i].links.reddit.campaign;

        function checkLink(link) {
            if (link) {
                return `<a href="${redditLink}" class="launch__link">Reddit thread</a>`;
            } else {
                return "";
            }
        }

        function checkDescription(link) {
            if (link) {
                return description;
            } else {
                return "Details to be announced at a later date.";
            }
        }

        html += `
            <div class="launch">
                <p class="launch__details">#${flightNo} | ${date}</p>
                <h3 class="launch__name">${launchName}</h3>
                <p class="launch__description">${checkDescription(
                    description
                )}</p>
                
                ${checkLink(redditLink)}
            </div>
        `;
    }

    loader.style.display = "none";

    container.innerHTML = html;
}
