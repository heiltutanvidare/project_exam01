// Fetch Astronomy picture of the day
async function fetchAPOD() {
    try {
        // Base APOD URL
        const url = "https://api.nasa.gov/planetary/apod";

        // My NASA API key
        const key = "?api_key=bTf1g1Q2o8yIUAKBFUNwZFotBpUMxecD5efRgfr6";
        const response = await fetch(url + key);
        const apod = await response.json();
        displayAPOD(apod);
    } catch (error) {
        console.error(error);

        const errorContainer = document.querySelector(".apod-error-container");
        errorContainer.innerHTML = `
            <p class="error__message">
                Will Robinson! Danger!
            </p>
        `;
    }
}

// Call the fetch apod function
fetchAPOD();

function displayAPOD(apod) {
    console.log(apod);

    // Get the image elements from the API result
    const mediaUrl = apod.url;
    const title = apod.title;
    const date = new Date(apod.date).toDateString();
    const caption = apod.explanation;
    const media = apod.media_type;
    const copyright = apod.copyright;

    // This functions sets the propper HTML type depending
    // on if the mediatype for the day is an image or a video
    // If its an iframe, the container gets propper aspect
    // ratio styling via the class "hasIframe"
    function checkMediaType(mediaType) {
        if (mediaType === "video") {
            return `
                <div class="apod__img-container hasIframe">
                    <iframe
                    src="${mediaUrl}"
                    alt="${title}"
                    class="apod__img"
                    allow="autoplay; encrypted-media" allowfullscreen/>
                    </iframe>
                </div>
            `;
        } else {
            return `
                <div class="apod__img-container">
                    <img src="${mediaUrl}"
                    alt="${title}"
                    class="apod__img">
                </div>
            `;
        }
    }

    // Check to see if copyright credits are available
    function checkCredits(copyright) {
        if (copyright) {
            return `
                <p class="apod__credits">&copy; ${copyright}</p>
            `;
        } else {
            return "";
        }
    }

    // Define the HTML for the APOD
    const html = `
            ${checkMediaType(media)}
            <div class="apod__text">
                <div class="apod__title-container">
                <p class="apod__date">${date}</p>
                <h3 class="apod__title">${title}</h3>
                ${checkCredits(copyright)}
                </div>
                <p class="apod__caption">${caption}</p>
            </div>

    `;

    // Apply the HTML to the container
    const container = document.querySelector(".apod__container");
    container.innerHTML = html;

    // Remove the loader
    const loader = document.querySelector(".apod-loader");
    loader.style.display = "none";
}
