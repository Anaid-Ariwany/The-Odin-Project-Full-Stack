export default function loadMenu() {
    const content = document.querySelector("#content");

    const menu = document.createElement("div");
    menu.classList.add("page", "menu-page");

    const heading = document.createElement("h2");
    heading.textContent = "Our Menu";

    const menuGrid = document.createElement("div");
    menuGrid.classList.add("menu-grid");

    const items = [
        {
            name: "Honey Pancake Stack",
            description: "Fluffy pancakes with honey butter and maple syrup.",
            price: "$8",
        },
        {
            name: "Forest Berry Waffles",
            description: "Crisp waffles topped with berries and whipped cream.",
            price: "$9",
        },
        {
            name: "Big Bear Breakfast",
            description: "Eggs, toast, potatoes, sausage, and fresh fruit.",
            price: "$12",
        },
        {
            name: "Golden French Toast",
            description: "Thick-cut toast with cinnamon, syrup, and powdered sugar.",
            price: "$10",
        },
        {
            name: "Morning Coffee",
            description: "Freshly brewed house coffee.",
            price: "$3",
        },
        {
            name: "Fresh Orange Juice",
            description: "Cold-pressed orange juice served chilled.",
            price: "$4",
        },
    ];

    items.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("menu-card");

        const itemName = document.createElement("h3");
        itemName.textContent = item.name;

        const itemDescription = document.createElement("p");
        itemDescription.textContent = item.description;

        const itemPrice = document.createElement("span");
        itemPrice.textContent = item.price;

        card.appendChild(itemName);
        card.appendChild(itemDescription);
        card.appendChild(itemPrice);

        menuGrid.appendChild(card);
    });

    menu.appendChild(heading);
    menu.appendChild(menuGrid);

    content.appendChild(menu);
}
