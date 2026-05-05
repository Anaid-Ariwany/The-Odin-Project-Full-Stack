import "./style.css";
import loadHome from "./home";
import loadMenu from "./menu";
import loadContact from "./contact";

const content = document.querySelector("#content");

const homeBtn = document.querySelector("#home-btn");
const menuBtn = document.querySelector("#menu-btn");
const contactBtn = document.querySelector("#contact-btn");

function clearContent() {
    content.textContent = "";
}

function setActiveButton(activeButton) {
    const buttons = [homeBtn, menuBtn, contactBtn];

    buttons.forEach((button) => {
        button.classList.remove("active");
    });

    activeButton.classList.add("active");
}

homeBtn.addEventListener("click", () => {
    clearContent();
    setActiveButton(homeBtn);
    loadHome();
});

menuBtn.addEventListener("click", () => {
    clearContent();
    setActiveButton(menuBtn);
    loadMenu();
});

contactBtn.addEventListener("click", () => {
    clearContent();
    setActiveButton(contactBtn);
    loadContact();
});

setActiveButton(homeBtn);
loadHome();
