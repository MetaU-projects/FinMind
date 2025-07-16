const apiKey = import.meta.env.VITE_SCHOOL_SEARCH
const apiKey2 = import.meta.env.VITE_NEWS_API

export const searchSchool = async (query) => {
        try {
        const res = await fetch(
            `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${query}`
        );
        const data = await res.json();
        return data.results;
    } catch (err) {
        console.error('Error searching for colleges', err)
        return []
    }
}

export const newsFeed = async (category) => {
        try {
        const res = await fetch(
            `https://api.thenewsapi.com/v1/news/top?locale=us&language=en&api_token=${apiKey2}&categories=${category}&limit=1`
        );
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.error('Error searching for colleges', err)
        return []
    }
}