const API_KEY = "9d93c3c008672daacb20d71886d54210"
const Base_URL = "https://api.themoviedb.org/3"

// سيرفر التشغيل المباشر
const STREAM_BASE_URL = "https://vidcore.org/embed";
// const STREAM_BASE_URL = "https://vidcore.io";


const SUBDL_API_KEY = import.meta.env.VITE_SUBDL_API_KEY;


export const getPopularMovies = async () => {
    const response = await fetch(`${Base_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json()

    return data.results
};

export const getTVShows = async () => {
    const response = await fetch(`${Base_URL}/tv/popular?api_key=${API_KEY}`)
    const data = await response.json()

    return data.results
};

// export const searchMovies = async (query) => {
//     const response = await 
//     const data = await response.json()

//     return data.results
// }

// export const searchTVShows = async (query) => {
//     const [moviesRes, tvRes] = await Promise.all([
//         fetch(`${Base_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`),
//         fetch(`${Base_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
//     ]);

//     const [moviesData, tvData] = await Promise.all([
//         moviesRes.json(),
//         tvRes.json()
//     ])

//     return data.results
// }

export const searchQuery = async (query) => {
    const response = await fetch(`${Base_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Filter out 'person' results if you only want movies and TV shows
    return (data.results || []).filter(
        item => item.media_type === 'movie' || item.media_type === 'tv'
    );
};

// 4. توليد رابط سيرفر التشغيل (Video Embed URL)
export const getStreamUrl = (
    type,
    id,
    season = 1,
    episode = 1,
    subtitle = "en"
) => {
    if (type === "movie") {
        return `${STREAM_BASE_URL}/movie/${id}?sub=${subtitle}`;
    }

    return `${STREAM_BASE_URL}/tv/${id}/${season}/${episode}?sub=${subtitle}`;
};


export const getArabicSubtitles = async (type, tmdbId) => {
    const params = new URLSearchParams({
        api_key: import.meta.env.VITE_SUBDL_API_KEY,
        tmdb_id: tmdbId,
        type: type,
        languages: "AR",
        subs_per_page: "10",
        unpack: "1",
    });

    const response = await fetch(
        `https://api.subdl.com/api/v1/subtitles?${params}`
    );

    if (!response.ok) {
        throw new Error(`SubDL error: ${response.status}`);
    }

    const data = await response.json();

    console.log("SUBDL RESPONSE:", data);
    console.log("SUBDL KEY EXISTS:", !!import.meta.env.VITE_SUBDL_API_KEY);

    return data.subtitles || [];
};