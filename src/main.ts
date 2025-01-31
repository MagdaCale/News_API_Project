import ky from "ky";
import { NewsApiResponse } from "./news-types";

const APIKEY = import.meta.env.VITE_PRIVATE_KEY;

async function getFilteredArticles(keyword: string, lang: string, sortby: string) {
    try {
        const allArticles = await ky.get<NewsApiResponse>(`https://newsapi.org/v2/everything?q=${keyword}&language=${lang}&sortBy=${sortby}&apiKey=${APIKEY}`).json();
        console.log(allArticles.articles);
        return allArticles.articles;
    } catch (error) {
        console.log("An error occurred: " + error);
        return [];
    }
}

// getFilteredArticles("money", "de", "relevance")
console.log(getFilteredArticles("money", "de", "relevance"));