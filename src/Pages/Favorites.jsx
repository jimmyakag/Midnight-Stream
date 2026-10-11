import '../index.css'
import NavBar from '../components/NavBar'
import { useMovieContext } from '../contexts/MovieContexts'
import MovieCard from '../components/MovieCard'

function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites.length !== 0) {
        return (
            <div className="Home justify-center">
                {favorites.some(movie => movie.title) && (
                    <div>
                        <h1 className="text-center text-[50px] ">Your Movies</h1>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-self-center gap-11">
                            {favorites.filter(movie => movie.title).map(movie => <MovieCard movie={movie} key={movie.id} />)}
                        </div>
                    </div>
                )}
                {favorites.some(movie => movie.name) && (
                    <div>
                        <h1 className="text-center text-[50px] ">Your TV Shows</h1>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-self-center gap-11">
                            {favorites.filter(movie => movie.name).map(movie => <MovieCard movie={movie} key={movie.id} />)}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="Home justify-center">
            <h1 className="text-center text-[50px] ">No Favorite Content Yet !!!</h1>
        </div>
    )


}

export default Favorites