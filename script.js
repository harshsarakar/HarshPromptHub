// ========================================
// HarshPromptHub - Main JavaScript
// ========================================


// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// CLOSE MOBILE MENU AFTER CLICKING A LINK
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


// SEARCH SYSTEM
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const promptCards = document.querySelectorAll(".prompt-card");
const promptGrid = document.querySelector(".prompt-grid");


// Search function
function searchPrompts() {

    const searchText = searchInput.value.toLowerCase().trim();

    let found = false;

    promptCards.forEach(card => {

        const cardText = card.innerText.toLowerCase();

        if (cardText.includes(searchText)) {

            card.style.display = "";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    // Remove previous "no results" message
    const oldMessage = document.querySelector(".no-results");

    if (oldMessage) {
        oldMessage.remove();
    }


    // Empty search = show everything
    if (searchText === "") {

        promptCards.forEach(card => {
            card.style.display = "";
        });

        return;
    }


    // No results found
    if (!found) {

        const message = document.createElement("div");

        message.className = "no-results";

        message.innerHTML = `
            <h3>😕 No prompts found</h3>
            <p>Try searching for something like "Independence", "portrait" or "cinematic".</p>
        `;

        promptGrid.appendChild(message);
    }
}


// SEARCH BUTTON
searchBtn.addEventListener("click", searchPrompts);


// SEARCH WHEN PRESSING ENTER
searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        searchPrompts();
    }

});


// CLEAR SEARCH WHEN INPUT BECOMES EMPTY
searchInput.addEventListener("input", () => {

    if (searchInput.value.trim() === "") {
        searchPrompts();
    }

});
