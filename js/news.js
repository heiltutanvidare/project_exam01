// API url
const url = "https://spaceflightnewsapi.net/api/v1/articles";

// Global vaiable to store the result
let news;

// Function to fetch the news
async function getNews() {
    try {
        const response = await fetch(url);
        const json = await response.json();
        news = json.docs;
        displayNews(news);
    } catch (error) {
        console.error(error);
        const errorContainer = document.querySelector(
            ".news__error__container"
        );
        errorContainer.innerHTML = `
        <p class="error__message">
            An error occurred <br>while loading the news
        </p>`;
    }
}

// Runb the function to get the news from
// the API each time the page loads
getNews();

// Function to display the news with a numberOfNews
// variable controlling how many is displayed
function displayNews(news) {
    // Select the DOM element to contain the launches
    const container = document.querySelector(".news__container");

    // declare variable for HTML to be used to display launches
    let html = "";

    // Looping over the results
    for (let i = 0; i < news.length; i++) {
        const img = news[i].featured_image;
        const date = new Date(news[i].published_date);
        const day = date
            .toLocaleDateString(undefined, { day: "2-digit" })
            .slice(0, -1);
        const month = date.toLocaleDateString(undefined, { month: "long" });
        const year = date.toLocaleDateString(undefined, { year: "numeric" });
        const site = news[i].news_site_long;
        const title = news[i].title;
        const url = news[i].url;

        // Seting the HTML of each article card
        html += `
        <article class="news__card">
            <img src="${img}" alt="${title}" class="news__card__img"></img>
            <div class="news__card__text">
            <small class="news__card__date-field">${day}. ${month} ${year}</small>
                <a class="news__card__title" href="${url}" target="_blank">
                    <h3>${title}</h3>
                </a>
                <small class="news__card__site">Source: <span>${site}</span> </small>
            </div>
        </article>
        `;

        // Seting the HTML on the container div
        container.innerHTML = html;

        // Removing the loader
        const loader = document.querySelector(".news__loader");
        loader.style.display = "none";
    }
}
