import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar";
import { getPopularMovies, getTVShows, searchQuery } from "../services/api";
import '../index.css'

function Home() {

    const [Search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [tvShows, setShows] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies || []);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies");
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

    useEffect(() => {
        const loadPopularShows = async () => {
            try {
                const popularShows = await getTVShows();
                setShows(popularShows || []);
            } catch (err) {
                console.log(err);
                setError("Failed to load shows");
            } finally {
                setLoading(false);
            }
        };

        loadPopularShows();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!Search.trim()) return
        setLoading(true)

        try {
            const searchResult = await searchQuery(Search)
            { setMovies(searchResult) || setShows(searchResult) }
            setError(null)
        } catch (err) {
            console.log(err);
            setError("Failed to load movies");
        } finally {
            setLoading(false);
        }


        setSearch("")
    }

    return <div className="Home justify-center">
        <div className="flex w-max justify-self-center mb-5 mt-5 bg-white/10">
            <form onSubmit={handleSearch} className="border-black border-2 text-white">
                <input type="text" placeholder="Search for movie" className="border-r-2 border-black" value={Search} onChange={(e) => setSearch(e.target.value)} />
                <button type="submit" className="p-1 hover:bg-white/25">Search</button>
            </form>
        </div>

        {error && <h1>{error}</h1>}

        <div>
            <h1 className="text-center text-[50px] ">Popular Movies</h1>
            {loading ? (<h1>Loading</h1>) :
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-self-center gap-11">
                    {movies.map(movie => <MovieCard movie={movie} key={movie.id} />)}
                </div>
            }
        </div>

        <div className="mt-12">
            <h1 className="text-center text-[50px] ">Popular TV Shows</h1>
            {loading ? (<h1>Loading</h1>) :
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-self-center gap-11">
                    {tvShows.map(movie => <MovieCard movie={movie} key={movie.id} />)}
                </div>
            }
        </div>
    </div>
}

export default Home