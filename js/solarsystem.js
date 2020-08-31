function displayPlanets(planets) {
    let html = "";

    for (let i = 0; i < planets.length; i++) {
        const number = planets[i].number;
        const tagline = planets[i].tagline;
        const planetName = planets[i].name;
        const description = planets[i].description;
        const img = planets[i].img;
        const type = planets[i].type;
        const moons = planets[i].moons;
        const radius = planets[i].radius;
        const distance = planets[i].distance;
        const dayLength = planets[i].day_length;
        const yearLength = planets[i].year_length;

        html += `
                <div class="planet">
                    <div class="planet__top">
                        <div class="planet__heading">
                            <p class="planet__number">${number}</p>
                            <p class="planet__tagline">${tagline}</p>
                            <h2 class="planet__name">${planetName}</h2>
                        </div>
                        <p class="planet__description">${description}</p>
                    </div>
            
                    <img
                        src="img/photos/solar_system/${img}"
                        alt="${planetName} – ${tagline}"
                        class="planet__img"
                    />
            
                    <div class="planet__bottom">
                        <div class="planet__facts">
                            <div class="planet__fact">
                                <p class="planet__fact__type">Planet type</p>
                                <p class="planet__fact__text">${type}</p>
                            </div>
                            <div class="planet__fact">
                                <p class="planet__fact__type">Moons</p>
                                <p class="planet__fact__text">${moons}</p>
                            </div>
                            <div class="planet__fact">
                                <p class="planet__fact__type">Equatorial radius</p>
                                <p class="planet__fact__text">${radius} km</p>
                            </div>
                            <div class="planet__fact">
                                <p class="planet__fact__type">Avg. distance from sun</p>
                                <p class="planet__fact__text">${distance} km</p>
                            </div>
                            <div class="planet__fact">
                                <p class="planet__fact__type">Length of day</p>
                                <p class="planet__fact__text">${dayLength}</p>
                            </div>
                            <div class="planet__fact">
                                <p class="planet__fact__type">Length of year</p>
                                <p class="planet__fact__text">${yearLength} earth days</p>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    }

    const container = document.querySelector(".planets");
    container.innerHTML = html;
}

displayPlanets(planets);
