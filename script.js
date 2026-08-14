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
// =====================================
// SUPABASE - LOAD PUBLISHED PROMPTS
// =====================================

const SUPABASE_URL =
    "https://qtnjiyijgtsjfwqguynx.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_DImSiDCiNzPuXO8c54DPVg_uQFzbzAX";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// Load prompts from database
async function loadPrompts() {

    const { data, error } =
        await supabaseClient
            .from("prompts")
            .select("*")
            .order("created_at", {
                ascending: false
            });

    if (error) {

    alert(
        "Database Error: " +
        error.message
    );

    console.error(error);

    return;
    }

    const grid =
        document.querySelector(".prompt-grid");

    if (!grid || !data) return;


    grid.innerHTML = "";


    data.forEach(prompt => {

        const card =
            document.createElement("article");

        card.className =
            "prompt-card";


        card.innerHTML = `

            <div class="prompt-image">

                <img
                    src="${prompt.image_url || ""}"
                    alt="${prompt.title}"
                   style="
                          width:100%;
                          height:100%;
                          object-fit:contain;
                          display:block;
                    "
                >

            </div>


            <div class="prompt-content">

                <span class="tag">
                    ${prompt.category}
                </span>

                <h3>
                    ${prompt.title}
                </h3>

                <p>
                    ${prompt.description || ""}
                </p>

                <a
                   href="prompt.html?id=${prompt.id}"
                   class="read-btn"
>
    View Prompt →
</a>

            </div>

        `;


        grid.appendChild(card);

    });

}


// Start loading
loadPrompts();

console.log("HarshPromptHub JS loaded");
