// Fetch next SpaceX launch
async function fetchNextLaunch() {
    try {
        const url = "https://api.spacexdata.com/v4/launches/next";
        const response = await fetch(url);
        const nextLaunch = await response.json();
        displayCountdown(nextLaunch);
        // displayNextLaunch(nextLaunch);
    } catch (error) {
        console.error(error);
    }
}

fetchNextLaunch();

// Display a count down in the hero section
function displayCountdown(nextLaunch) {
    // Set the date we're counting down to

    var countDownDate = new Date(nextLaunch.date_local).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="counter"
        document.getElementById("counter").innerHTML = `
        <div class="countdown">
            <div class="countdown__entity">
                <p>${days}</p>
                <p>days</p>
            </div>
            <div class="countdown__entity">
                <p>${hours}</p>
                <p>hours</p>
            </div>
            <div class="countdown__entity">
                <p>${minutes}</p>
                <p>min</p>
            </div>
            <div class="countdown__entity">
                <p>${seconds}</p>
                <p>sec</p>
            </div>
        </div>`;

        // Fade in the counter
        document.querySelector(".nextLaunch").style.opacity = "1";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById(
                "counter"
            ).innerHTML = `<p class="tba__text">To Be Announced</p>`;
        }
    }, 1000);
}

// Display the next upcomming launch
// in the feature section on the homepage

function displayNextLaunch(nextLaunch) {
    const container = document.querySelector(".launches-container");
    let html = "";

    const flightNo = nextLaunch.flight_number;
    const date = new Date(nextLaunch.date_utc).toDateString();
    const launchName = nextLaunch.name;
    let description = nextLaunch.details;
    let redditLink = nextLaunch.links.reddit.campaign;

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
        <div class="feature__launch">
            <p class="feature__launch__details">#${flightNo} | ${date}</p>
            <h3 class="feature__launch__name">${launchName}</h3>
            <p class="feature__launch__description">${checkDescription(
                description
            )}</p>
            
            ${checkLink(redditLink)}
            <a href="launches.html" class="btn btn--primary">
                See all launches
            </a>
        </div>
    `;

    // Remove the loader
    const loader = document.querySelector(".loader");
    loader.style.display = "none";

    container.innerHTML = html;
}
