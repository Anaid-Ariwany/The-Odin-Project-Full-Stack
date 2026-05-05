export default function loadHome() {
    const content = document.querySelector("#content");

    const home = document.createElement("div");
    home.classList.add("page", "home-page");

    const headline = document.createElement("h2");
    headline.textContent = "The Coziest Breakfast in Town";

    const heroText = document.createElement("p");
    heroText.textContent =
        "Fresh pancakes, golden waffles, hot coffee, and a warm place to start your day.";

    const imageBox = document.createElement("div");
    imageBox.classList.add("hero-image");
    imageBox.textContent = "Breakfast served fresh daily";

    const info = document.createElement("div");
    info.classList.add("info-box");

    const hours = document.createElement("p");
    hours.textContent = "Open daily from 7:00 AM - 2:00 PM";

    const location = document.createElement("p");
    location.textContent = "123 Honeycomb Street, Breakfast Town";

    info.appendChild(hours);
    info.appendChild(location);

    home.appendChild(headline);
    home.appendChild(heroText);
    home.appendChild(imageBox);
    home.appendChild(info);

    content.appendChild(home);
}
