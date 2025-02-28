import ky from "ky";
import { NewsApiResponse } from "./news-types";

const APIKEY = import.meta.env.VITE_PRIVATE_KEY;

export async function getFilteredArticles(keyword: string, lang: string, sortBy: string) {
    try {
        const allArticles = await ky
            .get<NewsApiResponse>(`https://newsapi.org/v2/everything`, {
                searchParams: {
                    q: keyword,
                    language: lang,
                    sortby: sortBy,
                    apiKey: APIKEY
                }
            })
        .json();
        return allArticles.articles;
    } catch (error) {
        console.log("An error occurred: " + error);
        return [];
    }
}