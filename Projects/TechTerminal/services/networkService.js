export async function fetchArticles(page, limit) {
    try {
        const devToData = await fetch(`https://dev.to/api/articles?page=${page}&per_page=${limit}`)
        return await devToData.json()
    } catch (err) {
        console.error(err)
    }
}

export async function fetchMemes() {
    try {
        const apiImgData = await fetch(`https://api.imgflip.com/get_memes`)
        const memes = await apiImgData.json()
        return memes.data.memes
    } catch (err) {
        console.error(err)
    }
}

export async function fetchNews(page, limit) {
    try {
        const newsApiData = await fetch(`https://newsapi.org/v2/top-headlines?category=technology&pageSize=${limit}&page=${page}&apiKey=815e9eba5581403fbed9631facddb9db`)
        const news = await newsApiData.json()
        return news.articles
    } catch (err) {
        console.error(err)
    }
}