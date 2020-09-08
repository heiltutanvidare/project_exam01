// Filter launches function
// Selecting the input HTML element
const filter = document.querySelector("#launchesSelect");

// Set the initial sorting value – It is passed to the fetch function later
let selectedFilter = filter.value;

// When user changes sorting method, update the sorting value and rund the fetch function
filter.addEventListener("change", function () {
    selectedFilter = filter.value;
    fetchLaunches(selectedFilter);
});

// Fetch the upcomming launches
// and display as HTML on next launches page
const errorContainer = document.querySelector(".launches-error-container");
const loader = document.querySelector(".loader");

// Fetch upcomming SpaceX launches
async function fetchLaunches(filter) {
    try {
        const url = "https://api.spacexdata.com/v4/launches" + filter;
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
        loader.style.display = "none";
    }
}

fetchLaunches(selectedFilter);

function displayLaunches(launches) {
    // Select the DOM element to contain the launches
    const container = document.querySelector(".launches-container");

    // declare variable for HTML to be used to display launches
    let html = "";

    for (let i = 0; i < launches.length; i++) {
        // Get the name of the launch
        const launchName = launches[i].name;

        // Get the flight number of the launch
        const flightNo = launches[i].flight_number;

        // Extract the day, month and year of the launches
        const date = new Date(launches[i].date_utc);
        const day = date
            .toLocaleDateString(undefined, { day: "2-digit" })
            .slice(0, -1);
        const month = date.toLocaleDateString(undefined, { month: "short" });
        const year = date.toLocaleDateString(undefined, { year: "numeric" });

        // Check to see if a Reddit link is available and return propper HTML
        let redditLink = launches[i].links.reddit.campaign;
        function checkLink(link) {
            if (link) {
                return `<a href="${redditLink}" target="_blank" class="launch__link">Reddit thread</a>`;
            } else {
                return "";
            }
        }

        // Check to see if a description is available, and return default text if not
        let description = launches[i].details;
        function checkDescription(link) {
            if (link) {
                return description;
            } else {
                return "Details to be announced at a later date.";
            }
        }

        // Set the HTML of each launch
        html += `
            <div class="launch">
                <div class="launch__date-box">
                    <p class="launch__day">${day}</p>
                    <p class="launch__month">${month}</p>
                    <p class="launch__year">${year}</p>
                </div>
                <div class="launch__details-box">
                    <p class="launch__details">#${flightNo}</p>
                    <h3 class="launch__name">${launchName}</h3>
                    <p class="launch__description">${checkDescription(
                        description
                    )}</p>
                    ${checkLink(redditLink)}
                </div>
            </div>
        `;
    }

    // Remove the loader
    loader.style.display = "none";

    // Apply the HTML to the contianer
    container.innerHTML = html;
}
