import { getFilteredArticles } from "./api";


const articlesGrid = document.querySelector("#articlesGrid")
let filteredArticles = await getFilteredArticles("politics", "en", "publishedAt");
console.log(filteredArticles);



// Sprachen filter function
function handleLanguageChange() {
    const languageSelect = document.querySelector('#languageSelect') as HTMLSelectElement;
    languageSelect.addEventListener('change', async (e) => {
        const selectedLanguage = (e.target as HTMLSelectElement).value;
        filteredArticles = await getFilteredArticles("politics", selectedLanguage, "publishedAt");
        renderArticles();
    });
}

// Sort by relevance function
function handleSortChange() {
    const sortSelect = document.querySelector('#sortSelect') as HTMLSelectElement;
    sortSelect.addEventListener('change', async (e) => {
        const selectedSort = (e.target as HTMLSelectElement).value;
        filteredArticles = await getFilteredArticles("politics", "en", selectedSort);
        renderArticles();
    });
}

// Such- function
function handleSearch() {
    const searchInput = document.querySelector('#searchInput') as HTMLInputElement;
    searchInput.addEventListener('input', async (e) => {
        const searchTerm = (e.target as HTMLInputElement).value;
        if (searchTerm.length >= 3) {
            filteredArticles = await getFilteredArticles(searchTerm, "en", "publishedAt");
            renderArticles();
        }
    });
}


handleLanguageChange();
handleSortChange();
handleSearch();


function renderArticles() {
    if(articlesGrid) {
        articlesGrid.innerHTML = "";

        filteredArticles.forEach((article) => {
            const newCard = document.createElement("article");
            articlesGrid.appendChild(newCard);
            newCard.classList.add("card");

            const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            newCard.innerHTML = `
                <div class="card-image">
                    <img src="${article.urlToImage}" alt="${article.title}">
                </div>
                <div class="card-content">
                    <div class="source">
                        <span class="source-name">${article.source.name}</span>
                        <span class="publish-date">${formattedDate}</span>
                    </div>
                    <h2 class="article-title">${article.title}</h2>
                    <p class="article-description">${article.description}</p>
                    <a href="${article.url}" class="read-more" target="_blank">Read More →</a>
                </div>
            `
        });
    }
}

renderArticles();