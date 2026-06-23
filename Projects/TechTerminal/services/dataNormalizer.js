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
        const shortDate = rawNews.publishedAt.slice(0, 10);
        const shortTitle = rawNews.title.slice(0, 15).replaceAll(' ', '_');
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