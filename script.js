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
        description: "A simple admin dashboard layout built with CSS Grid and Flexbox.",
        image: "assets/projects/admin-dashboard.webp",
        live: "https://anaid-ariwany.github.io/The-Odin-Project-Full-Stack/Intermediate-HTML-CSS/Projects/Admin-Dashboard",
        github: "https://github.com/Anaid-Ariwany/The-Odin-Project-Full-Stack/tree/main/Intermediate-HTML-CSS/Projects/Admin-Dashboard",
        source: "https://www.theodinproject.com/lessons/node-path-intermediate-html-and-css-admin-dashboard"
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
