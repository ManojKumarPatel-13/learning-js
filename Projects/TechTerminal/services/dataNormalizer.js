export default class dataNormalizer {
    static normalizeArticle(rawArticle) {
        return {
            id: rawArticle.id,
            title: rawArticle.title,
            image: rawArticle.cover_image,
            description: rawArticle.description,
            source: 'devto'
        }
    }

    static normalizeMeme(rawMeme) {
        return {
            id: rawMeme.id,
            title: rawMeme.name,
            image: rawMeme.url,
            description: `Trending Tech Meme`,
            source: 'imgflip'
        }
    }

    static normalizeNews(rawNews) {
        const shortDate = rawNews.publishedAt ? rawNews.publishedAt.slice(0, 10) : 'unknown-date';
        const shortTitle = rawNews.title ? rawNews.title.slice(0, 15).replaceAll(' ', '_') : 'untitled';
        const customId = `news_${shortDate}_${shortTitle}`;
        return {
            id: customId,
            title: rawNews.title,
            image: rawNews.urlToImage,
            description: rawNews.description,
            source: 'newsapi'
        }
    }
}