export default function loadContact() {
    const content = document.querySelector("#content");

    const contact = document.createElement("div");
    contact.classList.add("page", "contact-page");

    const heading = document.createElement("h2");
    heading.textContent = "Contact Us";

    const phone = document.createElement("p");
    phone.textContent = "Phone: (555) 123-4567";

    const email = document.createElement("p");
    email.textContent = "Email: hello@bearbites.com";

    const address = document.createElement("p");
    address.textContent = "Address: 123 Honeycomb Street, Breakfast Town";

    const hours = document.createElement("p");
    hours.textContent = "Hours: Monday - Sunday, 7:00 AM - 2:00 PM";

    contact.appendChild(heading);
    contact.appendChild(phone);
    contact.appendChild(email);
    contact.appendChild(address);
    contact.appendChild(hours);

    content.appendChild(contact);
}
