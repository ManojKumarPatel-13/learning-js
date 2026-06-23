import asyncEventBus from "./eventBus.js";
import dataNormalizer from "../services/dataNormalizer.js";
import { fetchArticles, fetchMemes, fetchNews } from "../services/networkService.js";

export const bus = new asyncEventBus();

async function loadFeed(feedType, page, limit) {
    let rawData = []

    try {
        if (feedType === "articles") {
            rawData = await fetchArticles(page, limit)
        }
        if (feedType === "memes") {
            rawData = await fetchMemes()
        }
        if (feedType === "news") {
            rawData = await fetchNews(page, limit)
        }

        let cleanData = []

        if (feedType === "articles" && rawData) {
            cleanData = rawData.map(item => dataNormalizer.normalizeArticle(item))
        }
        if (feedType === "memes" && rawData) {
            cleanData = rawData.map(item => dataNormalizer.normalizeMeme(item))
        }
        if (feedType === "news" && rawData) {
            cleanData = rawData.map(item => dataNormalizer.normalizeNews(item))
        }

        bus.emit("feed:loaded", cleanData);
    } catch (err) {
        console.error("Error processing feed load operation:", err);
    }
}

export { loadFeed };