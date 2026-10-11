import '../index.css'
import { Link } from 'react-router-dom'
import { useMovieContext } from '../contexts/MovieContexts'

function MovieCard({ movie }) {
    const { favorites, addFavorite, removeFavorite, isFavorite } = useMovieContext();
    const favorite = isFavorite(movie.id);

    const title = movie.title || movie.name || "Untitled";

    // Limit to 18 characters (adjust based on your card width)
    // const truncatedTitle = title.length > 25 ? `${title.slice(0, 22)}...` : title;

    // Figure out whether this is a movie or TV show
    const type = movie.media_type || (movie.title ? "movie" : "tv");

    function onFavoriteClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (favorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    }

    return (
        <div className='MovieCard bg-blue-900 grid grid-cols-2 justify-items-center content-start py-5 text-white rounded-4xl px-2.5'>
            {/* <button onClick={onFavoriteClick} className='bg-black rounded-full w-5 h-5 row-3 col-2 content-center self-start justify-self-end '>
                <h1>H</h1>
            </button> */}
            <div className='row-1 col-span-full'>
                <Link to={`/watch/${type}/${movie.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={title} className='rounded-4xl' />
                </Link>
            </div>

            <div className=' row-5 col-1'>
                <Link to={`/watch/${type}/${movie.id}`}>
                    <h1 className='text-start self-start'>{title}</h1>
                </Link>
            </div>

            <div className='col-2 row-5'>
                <Link to={`/watch/${type}/${movie.id}`}>
                    <p className='self-start'>
                        {movie.release_date?.split("-")[0]}
                    </p>
                    <p className='self-start'>
                        {movie.first_air_date?.split("-")[0]}
                    </p>
                </Link>
            </div>

            <button onClick={onFavoriteClick} className={`${favorite ? 'bg-red-500' : 'bg-black'} rounded-full h-6 w-6 col-2 row-3 cursor-pointer content-center justify-items-center `}>
                ❤︎⁠
            </button>
        </div>
    )

}

export default MovieCard