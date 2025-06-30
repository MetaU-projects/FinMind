const apiKey = import.meta.env.VITE_SCHOOL_SEARCH

export const searchSchool = async (query) => {
        try {
        const res = await fetch(
            `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${query}`
        );
        const data = await res.json();
        return Array.isArray(data) ? data: [];
    } catch (err) {
        console.error('Error searching for gifs', err)
        return []
    }
}