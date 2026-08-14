// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Mobile par link click karne ke baad menu close
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });

    });
}


// ===============================
// SEARCH
// ===============================

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function searchPrompts() {

    const query = searchInput.value.trim().toLowerCase();

    const cards = document.querySelectorAll(".prompt-card");

    if (!query) {

        cards.forEach(card => {
            card.style.display = "";
        });

        return;
    }

    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        if (text.includes(query)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

    // Trending section tak le jao
    document
        .getElementById("trending")
        ?.scrollIntoView({
            behavior: "smooth"
        });
}


// Search button
if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        searchPrompts
    );

}


// Enter press karke search
if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {
                searchPrompts();
            }

        }
    );

} 
