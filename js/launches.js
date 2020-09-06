// Filter launches function
// Selecting the input HTML element
const filter = document.querySelector("#launchesSelect");

// Set the initial sorting value – It is passed to the fetch function later
let selectedFilter = filter.value;

console.log(selectedFilter);

// When user changes sorting method, update the sorting value and rund the fetch function
filter.addEventListener("change", function () {
    console.log("Changed");
    selectedFilter = filter.value;
    console.log(selectedFilter);
    fetchLaunches(selectedFilter);
});

// Fetch the upcomming launches
// and display as HTML on next launches page
const errorContainer = document.querySelector(".launches-error-container");
const loader = document.querySelector(".loader");

// Fetch upcomming SpaceX launches
async function fetchLaunches(filter) {
    try {
        loader.display = "block";
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
        // loader.style.display = "none";
    }
}

fetchLaunches(selectedFilter);

function displayLaunches(launches) {
    const container = document.querySelector(".launches-container");

    // Remove the loader
    loader.style.display = "none";

    // declare variable for HTML to be used to display launches
    let html = "";

    for (let i = 0; i < launches.length; i++) {
        const flightNo = launches[i].flight_number;
        const day = new Date(launches[i].date_utc)
            .toLocaleDateString(undefined, {
                day: "2-digit",
            })
            .slice(0, -1);
        const month = new Date(launches[i].date_utc).toLocaleDateString(
            undefined,
            {
                month: "short",
            }
        );
        // const date = dateString.getDate();
        // const month = dateString.getMonth();
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
                <div class="launch__date-box">
                    <p class="launch__day">${day}</p>
                    <p class="launch__month">${month}</p>
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

    loader.style.display = "none";

    container.innerHTML = html;
}
