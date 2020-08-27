// Countdown

// Fetch next SpaceX launch
async function fetchNextLaunch() {
    try {
        const url = "https://api.spacexdata.com/v4/launches/next";
        const response = await fetch(url);
        const nextLaunch = await response.json();
        displayNextLaunch(nextLaunch);
    } catch (error) {
        console.error(error);
    }
}

fetchNextLaunch();

function displayNextLaunch(nextLaunch) {
    // Set the date we're counting down to
    console.log(nextLaunch.name);
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

        // Set the name of the launch in the heading
        const nextLaunchName = document.querySelector(
            ".nextLaunch-container h3 span"
        );
        nextLaunchName.innerText = nextLaunch.name;

        // Fade in the counter
        document.querySelector(".nextLaunch").style.opacity = "1";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("counter").innerHTML = "LIFT OFF!";
        }
    }, 1000);
}
