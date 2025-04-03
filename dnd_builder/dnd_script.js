document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const tableBody = document.querySelector("tbody");
    const outputSection = document.querySelector(".output");

    outputSection.style.display = "none";

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const attributes = ["name", "race", "class", "level", "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];

        tableBody.innerHTML = "";

        attributes.forEach(attribute => {
            const value = formData.get(attribute) || "N/A";
            const row = document.createElement("tr");
            row.innerHTML = `<td>${attribute.charAt(0).toUpperCase() + attribute.slice(1)}</td><td>${value}</td>`;
            tableBody.appendChild(row);
        });

        outputSection.style.display = "block";
    });
});
