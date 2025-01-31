import { getFilteredArticles } from "./api";

const searchInput = document.querySelector("#searchInput");
console.log(searchInput);
const articlesGrid = document.querySelector("#articlesGrid")

let filteredArticles = await getFilteredArticles("politics", "en", "publishedAt");
console.log(filteredArticles);

function renderArticles() {
    if(articlesGrid) {
        articlesGrid.innerHTML = "";

        filteredArticles.forEach((article) => {
            const newCard = document.createElement("article");
            articlesGrid.appendChild(newCard);
            newCard.classList.add("card");

            newCard.innerHTML = `
            <div class="card-image">
                <img src=${article.urlToImage} alt="${article.title}">
            </div>
            <div class="card-content">
                <div class="source">
                    <span class="source-name"></span>
                    <span class="publish-date">${article.publishedAt}</span>
                </div>
                <h2 class="article-title">${article.title}</h2>
                <p class="class-description">${article.description}</p>
                <a href="${article.url}" class="read-more">Read More →</a>
            </div>
            `
        })
    }
}
renderArticles();