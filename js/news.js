// API url
const url = "https://spaceflightnewsapi.net/api/v1/articles";

// Globad vaiable to store the result
let news;

// Function to fetch the news
async function getNews() {
    try {
        const response = await fetch(url);
        const json = await response.json();
        news = json.docs;
        displayNews(news, 3);
    } catch (error) {
        console.error(error);
        const errorContainer = document.querySelector(
            ".news__error__container"
        );
        errorContainer.innerHTML = `
        <p class="error__message">
            Houston, we have a problem…
        </p>`;
    }
}

getNews();

// Function to display the news with a numberOfNews
// variable controlling how many is displayed
function displayNews(news, numberOfNews) {
    // Select the DOM element to contain the launches
    const container = document.querySelector(".news__container");

    // declare variable for HTML to be used to display launches
    let html = "";

    // Looping over the results
    for (let i = 0; i < numberOfNews; i++) {
        const img = news[i].featured_image;
        const date = new Date(news[i].published_date);
        const day = date
            .toLocaleDateString(undefined, { day: "2-digit" })
            .slice(0, -1);
        const month = date.toLocaleDateString(undefined, { month: "short" });
        const site = news[i].news_site_long;
        const title = news[i].title;
        const url = news[i].url;
        const tags = news[i].tags;
        let tagHTML = "";

        // Adding a small html tag to each article tag
        tags.forEach((tag) => {
            tagHTML += `
            <small class="tag">${tag}</small>
            `;
        });

        // Seting the HTML of each article card
        html += `
        <article class="news__card">
            <div class="news__card__date">
                <p><span>${day}</span> <span>${month}</span></p>
            </div>
            <img src="${img}" alt="${title}" class="news__img"></img>
            <div class="news__card__text">
                <small class="news__card__site">Source: <span>${site}</span> </small>
                <a class="news__card__title" href="${url}" target="_blank">
                    <h3>${title}</h3>
                </a>
                <div class="tags">
                    ${tagHTML}
                </div>
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

// Button to run the display nes function with
// a larger number of entries (9 in this case)
const btn = document.querySelector("#loadMoreNews");
btn.addEventListener("click", function () {
    displayNews(news, 9);
    btn.style.display = "none";
});