const apiKey = import.meta.env.VITE_SCHOOL_SEARCH

export const searchSchool = async (query) => {
        try {
        const res = await fetch(
            `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${query}`
        );
        const data = await res.json();
        return data.results;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}