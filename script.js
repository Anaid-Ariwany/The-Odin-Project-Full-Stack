const projects = [
    {
        name: "Sign-Up Form",
        description: "A sign-up form with validation.",
        image: "assets/projects/sign-up-form.webp",
        live: "https://anaid-ariwany.github.io/The-Odin-Project-Full-Stack/Intermediate-HTML-CSS/Projects/Sign-Up-Form",
        github: "https://github.com/Anaid-Ariwany/The-Odin-Project-Full-Stack/tree/main/Intermediate-HTML-CSS/Projects/Sign-Up-Form",
        source: "https://www.theodinproject.com/lessons/node-path-intermediate-html-and-css-sign-up-form"
    },
    {
        name: "Admin Dashboard",
        description: "A simple admin dashboard layout built with CSS Grid.",
        image: "assets/projects/admin-dashboard.webp",
        live: "https://anaid-ariwany.github.io/The-Odin-Project-Full-Stack/Intermediate-HTML-CSS/Projects/Admin-Dashboard",
        github: "https://github.com/Anaid-Ariwany/The-Odin-Project-Full-Stack/tree/main/Intermediate-HTML-CSS/Projects/Admin-Dashboard",
        source: "https://www.theodinproject.com/lessons/node-path-intermediate-html-and-css-admin-dashboard"
    },
    {
        name: "Homepage",
        description: "A responsive homepage layout built with HTML and CSS.",
        image: "assets/projects/homepage.webp",
        live: "https://anaid-ariwany.github.io/The-Odin-Project-Full-Stack/Advanced-HTML-CSS/Projects/Homepage",
        github: "https://github.com/Anaid-Ariwany/The-Odin-Project-Full-Stack/tree/main/Advanced-HTML-CSS/Projects/Homepage",
        source: "https://www.theodinproject.com/lessons/node-path-advanced-html-and-css-homepage"
    },
    {
        name: "Library",
        description: "A simple library management system built with JavaScript Objects.",
        image: "assets/projects/library.webp",
        live: "https://anaid-ariwany.github.io/The-Odin-Project-Full-Stack/JavaScript/Projects/Library",
        github: "https://github.com/Anaid-Ariwany/The-Odin-Project-Full-Stack/tree/main/JavaScript/Projects/Library",
        source: "https://www.theodinproject.com/lessons/node-path-javascript-library"
    },
    {
        name: "Tic Tac Toe",
        description: "A classic Tic Tac Toe game built with JavaScript.",
        image: "assets/projects/tic-tac-toe.webp",
        live: "https://anaid-ariwany.github.io/The-Odin-Project-Full-Stack/JavaScript/Projects/Tic-Tac-Toe",
        github: "https://github.com/Anaid-Ariwany/The-Odin-Project-Full-Stack/tree/main/JavaScript/Projects/Tic-Tac-Toe",
        source: "https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe"
    },
    {
        name: "Restaurant Page",
        description: "A responsive restaurant page built dynamically with JavaScript.",
        image: "assets/projects/restaurant-page.webp",
        live: "https://anaid-ariwany.github.io/Restaurant-Page/",
        github: "https://github.com/Anaid-Ariwany/Restaurant-Page",
        source: "https://www.theodinproject.com/lessons/node-path-javascript-restaurant-page"
    },
    {
        name: "To-Do List",
        description: "A simple to-do list application built with JavaScript.",
        image: "assets/projects/to-do-list.webp",
        live: "https://anaid-ariwany.github.io/To-Do-List/",
        github: "https://github.com/Anaid-Ariwany/To-Do-List",
        source: "https://www.theodinproject.com/lessons/node-path-javascript-todo-list"
    },
    {
        name: "Weather App",
        description: "A simple weather application built with JavaScript and the Open-Meteo API.",
        image: "assets/projects/Weather-App.webp",
        live: "https://anaid-ariwany.github.io/The-Odin-Project-Full-Stack/JavaScript/Projects/Weather-App",
        github: "https://github.com/Anaid-Ariwany/The-Odin-Project-Full-Stack/tree/main/JavaScript/Projects/Weather-App",
        source: "https://www.theodinproject.com/lessons/node-path-javascript-weather-app"
    },
    {
        name: "Battleship",
        description: "A classic battleship game built with JavaScript.",
        image: "assets/projects/battleship.webp",
        live: "https://anaid-ariwany.github.io/The-Odin-Project-Full-Stack/JavaScript/Projects/Battleship",
        github: "https://github.com/Anaid-Ariwany/The-Odin-Project-Full-Stack/tree/main/JavaScript/Projects/Battleship",
        source: "https://www.theodinproject.com/lessons/node-path-javascript-battleship"
    },
    {
        name: "CV-Application",
        description: "A simple CV application built with React.",
        image: "assets/projects/cv-application.webp",
        live: "https://anaid-ariwany.github.io/CV-Application/",
        github: "https://github.com/Anaid-Ariwany/CV-Application",
        source: "https://www.theodinproject.com/lessons/node-path-react-new-cv-application"
    },
    {
        name: "Memory Card Game",
        description: "A simple memory card game built with React and Pokemon API.",
        image: "assets/projects/memory-card.webp",
        live: "https://anaid-ariwany.github.io/Memory-Card/",
        github: "https://github.com/Anaid-Ariwany/Memory-Card",
        source: "https://www.theodinproject.com/lessons/node-path-react-new-memory-card"
    }
    /* {
        name: "",
        description: "",
        image: "",
        live: "",
        github: "",
        source: ""
    } */
];


const projectContainer = document.querySelector(".projectContainer");

projects.forEach(project => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("card");
    projectCard.innerHTML = `
        <div class="row g-1">
            <div class="col-xxl-12 imagediv">
                <img src="${project.image}" class="card-img-top" alt="${project.name}">
            </div>
            <div class="col-xxl-12">
                <div class="card-body">
                    <h4 class="card-title poppins-semibold">${project.name}</h4>
                    <p class="card-text">${project.description}</p>
                    <div class="projectButtons">
                        <button onclick="window.open('${project.live}', '_blank', 'noopener,noreferrer')"
                            class="lightButton">Live Demo</button>
                        <button onclick="window.open('${project.github}', '_blank', 'noopener,noreferrer')"
                            class="darkButton">GitHub Repo</button>
                        <button onclick="window.open('${project.source}', '_blank', 'noopener,noreferrer')"
                            class="lightButton">Source</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    projectContainer.appendChild(projectCard);
});
